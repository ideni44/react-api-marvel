import './charList.scss'
import abyss from '../../resources/abyss.jpg'
import { Component } from 'react'
import MarvelService from '../../services/MarvelService'

import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage' 


class CharList extends Component {
    state = {
        charList:[],
        loading:true,
        error:false,
        newItemLoading:false,
        offset:210

    }

    marvelService = new MarvelService()
    
    componentDidMount(){
        this.onRequest()
    }

    onCharListLoaded = (newCharList) => {
        this.setState(({charList,offset})=>({
            charList:[...charList,...newCharList],
            loading:false,
            newItemLoading:false,
            offset:offset+9
        }))
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading:true
        })
    }

    onError = () => {
        this.setState({loading:false,error:true})
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService
            .getAllCharacters(offset)
            .then(charList => this.onCharListLoaded(charList))
            .catch(this.onError)
    }

    renderItems(arr){
        const items = arr.map(i=>{
            const{name,thumbnail} = i
            let imgStyle = {'objectFit':'cover'}
            if(thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit': 'unset'}
            }
            return(
                <li className="char__item" key={i.id} onClick={()=>{this.props.onCharSelected(i.id)}}> 
                    <img src={thumbnail} alt="abyss" style={imgStyle}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
        return(
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    render(){
        const{charList,loading,error,offset,newItemLoading} = this.state
        const items = this.renderItems(charList)

        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null
        const content = !(loading || error) ? items : null

        return(
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
            <button className="button button__main button__long" disabled={newItemLoading} onClick={()=>this.onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>)
    }
}


export default CharList