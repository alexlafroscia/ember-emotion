import { computed } from 'ember-emotion';

export const border = computed`
  border-width: 1px;
  border-style: solid;
  border-color: ${ctx => ctx.get('border')};
`;

export const dynamicParagraph = computed('color', 'size')`
  color: ${ctx => ctx.color};
  font-size: ${ctx => ctx.size}px;
`;
