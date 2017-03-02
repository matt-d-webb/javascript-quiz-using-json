# JavaScript Quiz using JSON

This code enables you to render questions with optional answers using radio buttons. Using [valid JSON](http://jsonlint.com/)
you can provide a list of questions and answers which will render to the user in sequence.

Each question can be assign a score against each option, this allows for a range of scores for each question.


### DEMO

A basic js fiddle [demo](https://jsfiddle.net/Webby2014/t4p8x02b/)

### EXAMPLE USE:

__JSON__

    {
       "question": "What year was the film The Shawshank Redemption released?",
                "includeInfo": true,
                "info": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
                "answers": [
                    {
                        "answer": "1995",
                        "score": 0
                    },
                    {
                        "answer": "1994",
                        "score": 0
                    },
                    {
                        "answer": "1993",
                        "score": 5
                    }
                ]
    }

__HTML__

    <div id="quiz"></div>


### TO DO

- [ ] Write ES6, Zero Dependency JavaScript Quiz
- [ ] Add Unit Tests (Mocha/Chai)
- [ ] Add Optional Parameters
- [ ] Create Demo Site
- [ ] Provide ReadMe Examples
