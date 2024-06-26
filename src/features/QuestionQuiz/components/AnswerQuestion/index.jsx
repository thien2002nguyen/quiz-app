import { memo, useEffect, useState } from "react";

function AnswerQuestion({ number, answer, countAnswerCorrect, onTurnOnClock, clickAnswer }) {

    const [listAnswer, setListAnswer] = useState([]);
    const [answerCorrect, setAnswerCorrect] = useState();
    const [choose, setChoose] = useState();
    const [showResult, setShowResult] = useState(false);
    const [checkChoose, setCheckChoose] = useState(true);

    useEffect(() => {
        if (answer !== undefined) {
            const listRandom = shuffleAnswer([answer.correct_answer, ...answer.incorrect_answers])
            setListAnswer(listRandom);
            setAnswerCorrect(answer.correct_answer);
            setChoose();
            setCheckChoose(true);
            setShowResult(false);
        }
    }, [answer]);

    const handleOnclick = (index) => {
        if (number === 0) {
            onTurnOnClock();
        }
        if (listAnswer[index] === answerCorrect) {
            countAnswerCorrect();
        }
        setChoose(index);
        setCheckChoose(false);
        setShowResult(true);
        clickAnswer();
    }

    //Xáo phần tử trong mảng
    const shuffleAnswer = (listAnswer) => {
        //Vòng lặp chạy từ vị trí của phần tử cuối cùng trong mảng
        for (let i = listAnswer.length - 1; i > 0; --i) {
            //Math.floor làm tròn dưới, Math.random trả một số ngẫu nhiên từ 0 đến i + 1
            const j = Math.floor(Math.random() * (i + 1));
            //Đổi vị trí hai phần tử nằm ở vị trí i, j trong mảng
            [listAnswer[i], listAnswer[j]] = [listAnswer[j], listAnswer[i]];
        }
        return listAnswer;
    }

    return (
        <>
            <div className='question__answer'>
                {listAnswer && listAnswer.map((answer, index) => (
                    <button
                        onClick={() => checkChoose && handleOnclick(index)}
                        className={`question__answer--nav 
                        ${choose === index ? listAnswer[choose] === answerCorrect ? 'correct' : 'choose' : ''}`}
                        key={index}
                    >{answer}</button>
                ))}
            </div >
            {showResult && <div className='answer'>Answer: {answerCorrect}</div>}
        </>

    );
}

export default memo(AnswerQuestion);