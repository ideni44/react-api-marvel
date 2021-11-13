import './charList.scss'
import { useEffect, useState } from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage' 
import useMarvelService from '../../services/MarvelService'


const CharList = (props) =>{

    const[charList,setCharList]=useState([])
    const[newItemLoading,setNewItemLoading]=useState(false)
    const[offset,setOffset]=useState(210)
    const {loading,error,getAllCharacters} = useMarvelService()
    
    useEffect(()=>{
        onRequest()
    },[])

    const onCharListLoaded = (newCharList) => {
        setCharList(charList => [...charList,...newCharList])
        setNewItemLoading(false)
        setOffset(offset => offset+9)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onRequest = (offset) => {
        onCharListLoading()
        getAllCharacters(offset)
            .then(charList => onCharListLoaded(charList))
    }

    function renderItems(arr){
        const items = arr.map(i=>{
            const{name,thumbnail} = i
            let imgStyle = {'objectFit':'cover'}
            if(thumbnail == 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {'objectFit': 'unset'}
            }
            return(
                <li className="char__item" key={i.id} onClick={()=>{props.onCharSelected(i.id)}}> 
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

    const items = renderItems(charList)
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? items : null
    return(
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
        <button className="button button__main button__long" disabled={newItemLoading} onClick={()=>onRequest(offset)}>
            <div className="inner">load more</div>
        </button>
    </div>
    )
}


export default CharList