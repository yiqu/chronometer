import { trigger, sequence, state, animate, transition, style, AnimationStyleMetadata } from '@angular/animations';

// Example fade in from none
export const rowsAnimation = 
trigger('rowsAnimation', [
  transition('void => *', [
    style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
    sequence([
      animate(".20s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
      animate(".20s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
    ])
  ])
]);

export const miniFade: AnimationStyleMetadata = style(
  { height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' }
);

export const normalDisplay: AnimationStyleMetadata = style(
  { height: '*', opacity: 1, transform: 'translateX(0)' }
);

export const fadedOut: AnimationStyleMetadata = style(
  { height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }
);


/**
 * States: 'added'
 * Added state has the style defined, and transition from void (nothing on screen) to
 * added state will start a sequence of animations
 */
export const rowsAnimation2 = 
  trigger('rowsAnimation2', [
    state('added', normalDisplay, {params: {someDefaultValue: false}}),

    transition('void => added', [
      sequence([
        fadedOut,
        animate("{{fadeOutTime}} ease", miniFade),
        animate("{{fadeInTime}} ease", normalDisplay)
      ])
    ])
  ]);

