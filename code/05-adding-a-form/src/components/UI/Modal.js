
import classes from './Modal.module.css'
import React from 'react'
import ReactDOM from 'react-dom'
//MISE EN PLACE DU MODAL STEPS :
/**
 * On créer dans index.html une nouvelle div ou on va faire afficher le modal
 * On créer le BackDrop component qui va prendre la bonne classe css pour empecher l'interaction avec le fond de la page
 * On créer ensuite le modalOverlay qui va contenir le component a afficher dedans, (ici Cart), on lui passe en contenu props.children du coup
 * Pour retourner ces 2 components il faut créer un "Portal", on import donc //! ReactDOM from 'react-dom
 * ReactDOM.createPortal(Le Component a renvoyer, le container où l'inserer (queryselector('#div dans le HTML')))
 * On créer le component  Modal qui va retourner le Backdrop et l'Overlay grace au Portal
 * 
 * //*dans le Component a afficher en temps de children (ici Cart) on wrap le Component dans le component Modal
 * dans le return du Compo Cart :
 * <Modal> Ton compo avec ses div ect .. </Modal>
 * //*Ne pas oublier d'inserer le component qui doit s'afficher a l'écran (Cart) dans App.js , peu importe son emplacement
 * 
 * 
 * 
 */
const BackDrop = props => {
  return <div className={classes.backdrop}></div>
}

const ModalOverlay = props => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
}


const portalElement = document.querySelector('#overlays')

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop/>,portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </>
  )
}

export default Modal