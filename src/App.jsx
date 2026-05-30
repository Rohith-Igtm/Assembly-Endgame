
import { languages } from './language'
import { useState } from 'react'
import clsx from 'clsx'
import { getFarewellText , getRandomWords } from './utils'
import Confetti from 'react-confetti-boom';


function App() {
    const [currentWord,setCurrentWord] = useState(()=>getRandomWords())
    const [guessLetter,setGuessLetter] = useState([])
    console.log(currentWord)

    const wrongGuessCount = guessLetter.filter(letter => !currentWord.includes(letter)).length
    const isGameWon = currentWord.split("").every(letter => guessLetter.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length -1
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessLetter[guessLetter.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

    function handleNewGame () {
        setGuessLetter([])
        setCurrentWord(getRandomWords())
    }

    function addguessLetter (letter) {
        setGuessLetter(prev =>
            prev.includes(letter) ? prev : [...prev,letter]
        )
    }

    const alphabets ="abcdefghijklmnopqrstuvwxyz"

    const alphabetElements = alphabets.split("").map(ele => {
        const isGuessed = guessLetter.includes(ele)
        const isCorrect = isGuessed && currentWord.includes(ele)
        const isWrong = isGuessed && !currentWord.includes(ele)
        return (
        <button 
        className={clsx("keyboard-btn",{
            correct :isCorrect,
            wrong : isWrong
        })}
        onClick={()=>addguessLetter(ele)} 
        disabled={isGameOver}
        key ={ele}>
            {ele.toUpperCase()}
        </button>
        )
    }
    )
    const letterElements = currentWord.split('').map((letter,index) => {
        const shouldRevelLetter = isGameLost || guessLetter.includes(letter)
        const className = clsx(
            isGameLost && !guessLetter.includes(letter) && "missed-letters"
        )
        return (
            <span key = {index} className={className}>
                { shouldRevelLetter ? letter.toUpperCase() : null}
            </span>
        )
        })

    const languageElements = languages.map((lang,index) => {
        const isLanglost = index < wrongGuessCount
        
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx("chip", {
            lost: isLanglost
        })
        return (
            <span 
                className={className} 
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })
    
    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return <p className="farewell-message">
                {getFarewellText(languages[wrongGuessCount-1].name)}
            </p>
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } 
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }


    return (
        <main>
            {
                isGameWon && <Confetti
                mode='boom' effectCount={5} effectInterval={1000}/>
            }
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>
            <section className={gameStatusClass}>
                {renderGameStatus()}
            </section>
            <section className="language-chips">
                {languageElements}
            </section>
            <section className='words'>
                {letterElements}
            </section>
            <section className='alpha-buttons'>
                {alphabetElements}
            </section>
            {isGameOver && <button className='new-game' onClick={handleNewGame}>New Game</button>}
        </main>
    )
}

export default App
