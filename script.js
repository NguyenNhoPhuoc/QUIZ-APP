const questions = [
    {
            question: "Which planet is known as the Red Planet?",
            answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
            ]
        },
        {
            question: "What is the largest mammal in the world?",
            answers: [
            { text: "Elephant", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Shark", correct: false },
            { text: "Giraffe", correct: false }
            ]
        },
        {
            question: "Which country is famous for the Eiffel Tower?",
            answers: [
            { text: "Germany", correct: false },
            { text: "France", correct: true },
            { text: "Italy", correct: false },
            { text: "Spain", correct: false }
            ]
        },
        {
            question: "What is the chemical symbol for water?",
            answers: [
            { text: "O2", correct: false },
            { text: "H2O", correct: true },
            { text: "CO2", correct: false },
            { text: "HO", correct: false }
            ]
        },
        {
            question: "Which is the longest river in the world?",
            answers: [
            { text: "Amazon", correct: true },
            { text: "Nile", correct: false },
            { text: "Yangtze", correct: false },
            { text: "Mississippi", correct: false }
            ]
        },
        {
            question: "Which language is the most spoken in the world?",
            answers: [
            { text: "English", correct: false },
            { text: "Chinese", correct: true },
            { text: "Spanish", correct: false },
            { text: "Hindi", correct: false }
            ]
        },
        {
            question: "Who wrote 'Hamlet'?",
            answers: [
            { text: "Charles Dickens", correct: false },
            { text: "William Shakespeare", correct: true },
            { text: "Jane Austen", correct: false },
            { text: "Mark Twain", correct: false }
            ]
        },
        {
            question: "What is the capital of Japan?",
            answers: [
            { text: "Seoul", correct: false },
            { text: "Beijing", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Bangkok", correct: false }
            ]
        },
        {
            question: "How many continents are there on Earth?",
            answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
            ]
        },
        {
            question: "Which animal is known as the King of the Jungle?",
            answers: [
            { text: "Tiger", correct: false },
            { text: "Elephant", correct: false },
            { text: "Lion", correct: true },
            { text: "Gorilla", correct: false }
            ]
        }
      
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct; 
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.style.display="block";
    nextButton.innerHTML ="Play again";
    
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    } else {
        showScore();
    }
}
startQuiz();