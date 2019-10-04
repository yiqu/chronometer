import { trigger, sequence, state, animate, transition, style } from '@angular/animations';

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


export const rowsAnimation2 = 
  trigger('rowsAnimation2', [
    state('added', 
      style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  }),
      {params: {onPaging: false}}
    ),
    state('done',
      style({ height: '*', opacity: 1, transform: 'translateX(0)' })
    ),


    transition('void => added', [
      style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
      sequence([
        animate(".20s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
        animate(".20s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]);