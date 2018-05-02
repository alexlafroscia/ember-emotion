'use strict';

var utils = require('./utils');
var semver = require('semver');

function ClassTransformPlugin() {
  this.syntax = null;
  this.builders = null;
  this.isGlimmer = false;
}

ClassTransformPlugin.forEmberVersion = function(version) {
  if (semver.lt(version, '2.15.0-alpha')) {
    return ClassTransformPlugin;
  } else {
    // The version of Glimmer that landed in Ember 3.1 changed this interface
    const visitorKey = semver.lt(version, '3.1.0-alpha')
      ? 'visitors'
      : 'visitor';

    // TODO refactor to adapt the new format to the old instead of vice versa
    return function(env) {
      return {
        name: 'ember-emotion',
        [visitorKey]: {
          Program: function(node) {
            var plugin = new ClassTransformPlugin(env);
            plugin.syntax = env.syntax;
            return plugin.transform(node);
          }
        }
      };
    };
  }
};

ClassTransformPlugin.prototype.constructor = ClassTransformPlugin;

ClassTransformPlugin.prototype.transform = function(ast) {
  if (!this.builders) {
    this.builders = this.syntax.builders;
    this.isGlimmer = this.detectGlimmer();
  }

  this.syntax.traverse(ast, {
    MustacheStatement: this.transformStatement.bind(this),
    BlockStatement: this.transformStatement.bind(this),
    SubExpression: this.transformSubexpression.bind(this)
  });

  return ast;
};

ClassTransformPlugin.prototype.detectGlimmer = function() {
  if (!this.syntax.parse) {
    return false;
  }

  // HTMLBars builds ConcatStatements with StringLiterals + raw PathExpressions
  // Glimmer builds ConcatStatements with TextNodes + MustacheStatements
  var ast = this.syntax.parse('<div class="foo {{bar}}"></div>');
  return ast.body[0].attributes[0].value.parts[0].type === 'TextNode';
};

ClassTransformPlugin.prototype.transformStatement = function(node) {
  if (node.path.original === 'emotion-class') {
    this.transformLocalClassHelperInvocation(node);
  } else {
    this.transformPossibleComponentInvocation(node);
  }
};

ClassTransformPlugin.prototype.transformSubexpression = function(node) {
  if (node.path.original === 'emotion-class') {
    this.transformLocalClassHelperInvocation(node);
  }
};

// Transform {{emotion-class 'foo'}} into {{emotion-class 'foo' from=(unbound __styles__)}}
ClassTransformPlugin.prototype.transformLocalClassHelperInvocation = function(
  node
) {
  if (utils.getPair(node, 'from')) {
    return;
  }

  node.hash.pairs.push(this.builders.pair('from', this.styles()));
};

ClassTransformPlugin.prototype.transformPossibleComponentInvocation = function(
  node
) {
  var localClassPair = utils.getPair(node, 'emotion-class');
  if (!localClassPair) {
    return;
  }

  utils.removePair(node, localClassPair);

  var classPair = utils.getPair(node, 'class');
  var params = [];
  var concatSexpr;

  if (classPair) {
    params.push(classPair.value);
    utils.removePair(node, classPair);
  }

  utils.pushAll(params, this.localToPath(localClassPair.value));
  this.divide(params, 'string');
  concatSexpr = this.builders.sexpr(this.builders.path('concat'), params);
  node.hash.pairs.push(this.builders.pair('class', concatSexpr));
};

ClassTransformPlugin.prototype.localToPath = function(node) {
  if (~['SubExpression', 'MustacheStatement'].indexOf(node.type)) {
    return this.dynamicLocalPath(node);
  } else if (node.type === 'ConcatStatement') {
    return this.concatLocalPath(node);
  } else if (~['TextNode', 'StringLiteral'].indexOf(node.type)) {
    return this.staticLocalPath(node);
  } else {
    throw new TypeError(
      'ember-emotion - invalid type, ' +
        node.type +
        ', passed to emotion-class attribute.'
    );
  }
};

ClassTransformPlugin.prototype.dynamicLocalPath = function(node) {
  var localClassPath = this.builders.path('emotion-class');

  var builder;
  if (node.type === 'SubExpression') {
    builder = 'sexpr';
  } else if (node.type === 'MustacheStatement') {
    node = utils.mustacheToSexpr(this.builders, node);
    builder = 'mustache';
  }

  var hash = this.builders.hash([this.builders.pair('from', this.styles())]);
  var localClassInvocation = this.builders[builder](
    localClassPath,
    [node],
    hash
  );

  return [localClassInvocation];
};

ClassTransformPlugin.prototype.styles = function() {
  return this.builders.path('__emotion__styles__');
};

ClassTransformPlugin.prototype.concatLocalPath = function(node) {
  var concatPath = this.builders.path('concat');
  var concatParts = utils.concatStatementToParams(
    this.builders,
    node,
    this.isGlimmer
  );
  var concatStatement = this.builders.mustache(concatPath, concatParts);
  return this.dynamicLocalPath(concatStatement);
};

ClassTransformPlugin.prototype.staticLocalPath = function(node) {
  var locals = typeof node.chars === 'string' ? node.chars : node.value;
  var builder = typeof node.chars === 'string' ? 'mustache' : 'sexpr';
  var classes = locals.split(' ');

  return classes
    .filter(function(local) {
      return local.trim().length > 0;
    })
    .map(function(local) {
      var unboundPath = this.builders.path('unbound');
      var stylePath = this.builders.path('__styles__.' + local.trim());
      return this.builders[builder](unboundPath, [stylePath]);
    }, this);
};

ClassTransformPlugin.prototype.divide = function(parts, builder) {
  for (var i = 0; i < parts.length - 1; i++) {
    if (~['StringLiteral', 'TextNode'].indexOf(parts[i].type)) {
      utils.updateStringValue(parts[i], function(str) {
        return str + ' ';
      });
    } else if (~['StringLiteral', 'TextNode'].indexOf(parts[i + 1].type)) {
      utils.updateStringValue(parts[i + 1], function(str) {
        return ' ' + str;
      });
    } else {
      parts.splice(i + 1, 0, this.builders[builder](' '));
      i++;
    }
  }

  return parts;
};

module.exports = ClassTransformPlugin;
