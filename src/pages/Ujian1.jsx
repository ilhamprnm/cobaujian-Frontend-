import React, {useEffect, useContext} from 'react'
import keteranganUjian from '../images/keterangan-ujian.svg'
import nextIcon from '../icons/next.png'
import backIcon from '../icons/back.png'
import {QuestionContext} from '../data/questions.jsx'
import Answer from '../components/Answer.jsx'
import QuestionNumber from '../components/QuestionNumber.jsx'
import TimeCounter from '../components/TimeCounter.jsx'


const Ujian1 = () => {

  const [questionState, dispatch] = useContext(QuestionContext);

  
  console.log(questionState)
  const currentQuestion = questionState.soal1[questionState.currentQuestionIndex];
  

  useEffect(() => {
    function adjustHeroMargin() {
      const navbar = document.getElementById('navbar');
      const hero = document.getElementById('question');
      const navbarHeight = navbar.offsetHeight;
      hero.style.marginTop = `${navbarHeight}px`;
    }

    // Adjust margin on page load
    adjustHeroMargin();

    // Adjust margin on window resize
    window.addEventListener('resize', adjustHeroMargin);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', adjustHeroMargin);
    };
  }, []);

  return (
    <div className=''>
      <div className='flex flex-col md:flex-row justify-between items-center gap-3 border py-5 px-2 md:px-28 fixed top-0 left-0 right-0 bg-white' id='navbar'>
        <div>
          <p className='font-bold text-xl min-[460px]:text-3xl'>Paket 1 - Diagram Reasoning</p>
        </div>
        <div>
          <p className='font-semibold text-xl'>Questions {questionState.currentQuestionIndex + 1}/{questionState.soal1.length}</p>
        </div>
        <div>
          <TimeCounter />
        </div>
      </div>
      <div className='p-6 min-[1000px]:px-28 flex flex-col min-[1000px]:flex-row gap-4' id='question'>
        <div className=' w-full flex flex-col order-2 min-[1000px]:order-1 gap-3'>
          <div className='border py-7 px-12 bg-[#e5efee] w-full rounded-md '>
            <div className='flex flex-col gap-3'>
              <div>
                <h3 className='text-xl text-gray-500'>Soal {questionState.currentQuestionIndex + 1}</h3>
              </div>
              <div className='bg-white rounded-md p-2 text-xl text-justify'>
                <p>{currentQuestion.Soal}</p>
              </div>
              <div>
                <div className='border-2 border-black'></div>
              </div>
              <div className='flex flex-col gap-4'>
                {questionState.answers.map((answer, index)  => (
                  <Answer 
                    answerText={answer} 
                    key={index} 
                    index={index}
                    onClick={() => dispatch({type: "SELECT_ANSWER", payload: answer})}
                    />
                ))}
                
              </div>
              <div className='flex justify-end font-semibold text-gray-500 cursor-pointer'>
                <div onClick={() => dispatch({type: 'DELETE_ANSWER'})}>
                  <p>Hapus Pilihan</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex justify-end gap-4 flex-wrap'>
            <div>
              <button className='px-8 py-2 rounded-full bg-slate-400 flex gap-3 items-center' onClick={() => dispatch({type: "PREVIOUS_QUESTION"})}>
                <img className='h-5' src={backIcon} alt="backIcon" />
                <p className='font-bold text-white'>Kembali</p>
              </button>
            </div>
            <div>
              <button 
              className='px-8 py-2 rounded-full border border-orange-400 text-orange-400 flex gap-3 items-center' 
              onClick={() => {dispatch({type: "SELECT_ANSWER", payload:"ragu"})}}
              style={{
                color: questionState.soal1[questionState.currentQuestionIndex].currentAnswer === 'ragu' ? 'white' : '#f6993f',
                backgroundColor: questionState.soal1[questionState.currentQuestionIndex].currentAnswer === 'ragu' ? '#f6993f' : 'white'
               }}
              >
                <p className='font-bold'>! Ragu</p>
              </button>
            </div>
            <div>
              <button className='px-8 py-2 rounded-full bg-[#529493] flex items-center gap-3' onClick={() => dispatch({type: "NEXT_QUESTION"})}>
                <p className='font-bold text-white's>Next</p>
                <img className='h-5' src={nextIcon} alt="next" />
              </button>
            </div>
          </div>
        </div>
        <div className=' min-[1000px]:max-w-[300px] w-full order-1 min-[1000px]:order-2 overflow-hidden p-1 flex flex-col gap-3'>
          <div className='border-2 border-black rounded-md'>
            <div className='flex flex-col items-center gap-3'>
              <div className='pt-4'>
                <p className='font-bold'>Nomor Soal</p>
              </div>
              <div className='flex gap-2  min-[1000px]:flex-wrap w-full p-4 overflow-x-scroll min-[1000px]:overflow-x-auto max-h-64'>
                {questionState.soal1.map((soal) => (
                  <QuestionNumber 
                    soal={soal}
                    key={soal.No}
                    onClick={() => dispatch({type: "SELECT_NUMBER", payload: soal.No})}
                  />
                ))}
                
              </div>
              <div className='pb-5 px-3'>
                  <img src={keteranganUjian} alt="keterangan-ujian" />
              </div>
            </div>
          </div>
          <div className='flex text-center'>
            <a className='w-full bg-gray-400 text-white p-2 rounded-md font-semibold' href='/platform'>Selesai</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ujian1