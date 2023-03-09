/* For each of the following code blocks, read the expression and predict
what the result of evaluating it would be, then execute the expression
in the Chrome console. */

'1' + 2  //prediction:  '12' -- output: '12'

typeof '1' + 2  //prediction:  string2 -- output: 'string2'

6 % 4  //prediction:  2 -- output: 2

'3 + 4 is ' + 3 + 4 //prediction: '3 + 4 is 34' -- output: '3 + 4 is 34'
// how could you make this produce the correct output? --place parenthesis around 3 + 4

0 < 0  //prediction: false -- output: false

'false' == false //prediction: false -- output: false

true == 'true' //prediction:  false -- output: false

5 >= -5 //prediction: true -- output: true

!false || false //prediction:  true -- output: true

true || "42"  //prediction: true -- output: true

!true && !false  //prediction: false -- output: false

6 % 5  //prediction: 1 -- output: 1

5 < 4 && 1 === 1 //prediction: false -- output: false

typeof 'codeup' === 'string' //prediction: true -- output: true

'codeup' === 'codeup' && 'codeup' === 'Codeup' //prediction: false -- output: false

4 >= 0 && 1 !== '1' //prediction: true -- output: true

6 % 3 === 0 //prediction: true -- output: true

5 % 2 !== 0 //prediction: true -- output: true