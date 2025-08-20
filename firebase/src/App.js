import { useState, useEffect } from "react";
import { db } from './firebase/config';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { doc, deleteDoc } from "firebase/firestore";

const App = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [webTitle, setWebTitle] = useState("")
  const [webAlt, setWebAlt] = useState("")
  const [webImage, setWebImage] = useState("")
  const [webDescription, setWebDescription] = useState("")

  const submitForm = async (e) => {
    e.preventDefault()
    const newObject = {title:webTitle, imageUrl:webImage, alt:webAlt, description:webDescription}
    
    if (!webTitle || !webImage || !webAlt) {
      setError("Vyplň všechna pole.");
      return;
    }
    try{
      const docRef = await addDoc(collection(db, "my-website"), newObject);
      setData((prev) => [...prev, { id: docRef.id, ...newObject }]);

        // 🧼 Vyčištění formuláře po odeslání:
  // setWebTitle("");
  // setWebImage("");
  // setWebAlt("");
  // setWebDescription("");
  // setError(""); // volitelné: smaže případnou předchozí chybovou hlášku
    }
    catch (err) {
      setError("Něco se pokazilo při ukládání.")
    }
    
    
  }

  const deleteMovie = async (id) => {
    try {
      await deleteDoc(doc(db, "my-website", id));
      setData(data.filter((item) => item.id !== id)); // aktualizuj zobrazená data
    } catch (error) {
      console.error("Chyba při mazání dokumentu:", error);
    }
  };

  const currentPhoto = selectedIndex !== null ? data[selectedIndex] : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const colRef = collection(db, "my-website");
        const snapshot = await getDocs(colRef);

        if (snapshot.empty) {
          setError("Žádná data nebyla nalezena.");
          return;
        }

        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setData(results);
      } catch (err) {
        console.error(err);
        setError("Nastala chyba při načítání dat.");
      }
    };

    fetchData();
  }, []);

  const handleClose = () => setSelectedIndex(null);
  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };


  return (
    <article>
      <h2>Fotogalerie</h2>
      <div className="all-photos">
        {error && <p>{error}</p>}
        {data.map(({ id, title, alt, imageUrl }, index) => (
  <div key={id} className="one-photo">
    <h3>{title}</h3>
    <img
      src={imageUrl}
      alt={alt}
      onClick={() => setSelectedIndex(index)}
      style={{ cursor: "pointer" }}
    />
    <button onClick={() => deleteMovie(id)} className="delete-btn">
      Smazat
    </button>
  </div>
))}

        {currentPhoto && (
          <div className="lightbox" onClick={handleClose}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={handleClose}><CgClose /></button>
              <button className="nav-btn left" onClick={handlePrev}><FaAngleLeft /></button>
              <img src={currentPhoto.imageUrl} alt={currentPhoto.alt} />
              <p className="caption">{currentPhoto.description}</p>
              <button className="nav-btn right" onClick={handleNext}><FaAngleRight /></button>
            </div>
          </div>
        )}
        <form action="" onSubmit={submitForm} className="form">
        <input 
          type="text" 
          placeholder="title"
          value={webTitle}
          onChange={(e) =>{setWebTitle(e.target.value)}}
          className="input"/>
        <input 
          type="text" 
          placeholder="imgUrl"
          value={webImage}
          onChange={(e) =>{setWebImage(e.target.value)}}
          className="input"/>
        <input 
          type="text" 
          placeholder="alt"
          value={webAlt}
          onChange={(e) =>{setWebAlt(e.target.value)}}
          className="input"/>
          <input 
          type="text" 
          placeholder="description"
          value={webDescription}
          onChange={(e) =>{setWebDescription(e.target.value)}}
          className="input"/>
        <input 
        type="submit" className="btn"/>
      </form>
      </div>

      
    </article>
  );
};

export default App;
