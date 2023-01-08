
function Quiz(questions) {
    this.questions = questions;
    this.score = 0
    this.questionIndex = 0;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function (userAnswer) {
    if (this.getQuestionByIndex().isCorrectAnswer(userAnswer)) {
        this.score++;
    }
    this.questionIndex++;
}

function Question(questionText, choices, answer) {
    this.questionText = questionText;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (userAnswer) {
    return this.answer === userAnswer;
}


function loadQuestions() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        let question = quiz.getQuestionByIndex();
        var element = document.getElementById("question");
        element.innerHTML = question.questionText;

        // show options
        var choices = question.choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionWithAnswer(choice);
        loadQuestions();
    }
}

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
}

function showScores() {
    let quizOverHTML = "<h1>Result</h1>";
    quizOverHTML += "<h2> Your score: " + quiz.score + ". & mark percentage is: " + (quiz.score * 100 / quiz.questions.length) + "% </h2>";
    document.getElementById("quiz").innerHTML = quizOverHTML;
}


let questions = [
    new Question("Javascript is an---language?", ["Object-Oriented", "Object-Based", "Procedural", "Non of the above"], "Object-Oriented"),
    new Question("What keyword is used to declare an asynchronous function in Javascript?", ["await", "async", "setTimeout", "XML"], "async"),
    new Question("How to stop an interval timer in Javascript?", ["clearInterval", "clearTimer", "intervalOver", "non of the above"], "clearInterval"),
    new Question("How do we write a comment in javascript?", ["/* */", "//", "#", "$ $"], "//"),
    new Question("Which of the following are not server-side Javascript objects?", ["Date", "File Upload", "Function", "All of the Above"], "All of the Above")
];

let quiz = new Quiz(questions);

loadQuestions();





