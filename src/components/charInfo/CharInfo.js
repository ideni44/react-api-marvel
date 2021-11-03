import './charInfo.scss'
import thor from '../../resources/thor.jpeg'
import { Component } from 'react'
import MarvelService from '../../services/MarvelService'
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage' 

class CharInfo extends Component {

    state = {
        char:null,
        loading:false,
        error:false
    }

    marvelService = new MarvelService()

    componentDidMount(){
        this.updateChar()
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.charId !== this.props.charId){
            this.updateChar()
        }
    }

    updateChar = () => {
        const {charId} = this.props
        console.log(charId)
        if(!charId){
            return
        }
        this.onCharLoading()
        this.marvelService.getCharacter(charId).then(res=>{this.onChatLoaded(res)}).catch(this.onError)
    }

    
    onChatLoaded = (char) => {
        this.setState({char,loading:false})
        // console.log(this.state)
    }

    onCharLoading = (char) => {
        this.setState({char,loading:true})
        // console.log(this.state)
    }

    onError = () => {
        this.setState({loading:false,error:true})
    }

    render(){
        const{char,loading,error} = this.state
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