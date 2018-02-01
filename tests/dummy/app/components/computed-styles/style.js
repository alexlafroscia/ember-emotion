import { computed } from 'ember-emotion';

export const border = computed`
  border-width: 1px;
  border-style: solid;
  border-color: ${cxt => cxt.get('border')};
`;

export const dynamicParagraph = computed('color')`
  color: ${cxt => cxt.get('color')};
`;
