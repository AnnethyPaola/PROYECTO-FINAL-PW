import { useState, useEffect } from "react";
import  db from "./Confi/firebase";
import {collection,getDocs,addDoc} from "firebase/firestore";


function AgregarPost() {

  const [NewTitulo, setNewTitulo] = useState();
  const [NewContenido, setNewContenido] = useState();
  const [NewAutor, setNewAutor] = useState();


  const [post, setPost] = useState([]);
  const postCollection = collection(db, "post");

  const createPost = async (e) => {
  	e.preventDefault();
    await addDoc(postCollection, { Titulo: NewTitulo, Contenido: NewContenido, Autor: NewAutor });
  };



    useEffect(() => {
    const getPost = async () => {
      const data = await getDocs(postCollection);
      setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPost();
  }, []);

	return(
     <form > 
     <div className="form-group input-group">
     <div className="input-group-text bg-light">
        <i className="material-icons">title</i>
     </div>
     <input type="text" className="form-control" required="Campo requerido" placeholder="Titulo" name="titulo" onChange={(event) => {
          setNewTitulo(event.target.value);
        }}/>
     </div>

     <div className="form-group input-group">
     <div className="input-group-text bg-light">
        <i className="material-icons">create</i>
     </div>
     <textarea name="contenido" rows="4" className="form-control" placeholder="Escriba el contenido e su post" onChange={(event) => {
          setNewContenido(event.target.value);
        }}></textarea>
     </div> 

     <div className="form-group input-group">
     <div className="input-group-text bg-light">
        <i className="material-icons">person</i>
     </div>
     <input type="text" className="form-control" placeholder="Autor" name="autor" onChange={(event) => {
          setNewAutor(event.target.value);
        }} />
     </div>
     <button className="btn btn-primary btn-block" onClick={createPost}> Guardar Post </button>
    
     </form>
          
           
		)
     
};

export default AgregarPost;