import './charInfo.scss'
import { useState, useEffect} from 'react'
import MarvelService from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage' 
import useMarvelService from '../../services/MarvelService'

const CharInfo = (props) => {

    const [char,setChar] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    const marvelService = useMarvelService()


    useEffect(()=>{
        updateChar()
    },[props.charId])

    const updateChar = () => {
        const {charId} = props
        if(!charId){
            return
        }
        onCharLoading()
        marvelService.getCharacter(charId).then(char=>onChatLoaded(char)).catch(onError)
    }

    
    const onChatLoaded = (char) => {
        setChar(char)
        setLoading(false)
    }

    const onCharLoading = () => {
        setLoading(true)
        // console.log(this.state)
    }

    const onError = () => {
        setLoading(false)
        setError(true)
    }

    const skeleton = (char || loading || error) ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return(
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {description,name,thumbnail,homepage,wiki,comics} = char
    let imgStyle = {'objectFit':'cover'}
    if(thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {'objectFit': 'unset'}
    }
    return(
        <>
                        <div className="char__basics">
                    <img src={thumbnail} alt="abyss" style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="char__descr">{description}</div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'No comics yet((('}
                    {
                        comics.map((i,index)=>{
                            if(index<10){
                                return(
                                    <li key={index} className="char__comics-item">
                                        {i.name}
                                    </li>
                                )
                            }
                        })
                    }
                </ul>
        </>
    )
}
export default CharInfo