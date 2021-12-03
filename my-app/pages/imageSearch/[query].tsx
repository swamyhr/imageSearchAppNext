import React, {useState} from 'react';
import axios from 'axios';
import Link from 'next/link';

var a: number = 10; 
// public search_image_text: string = "";

function ImageSearch({ unspalsh_images }: any){

    // Creating State Hook for Image Search text and Store response Images
    let [searchText, setSearchText] = useState('');
    let [unspalshImages, setUnsplashImages] = useState([]);
    
    // API Calling Function
    async function fetchImages(image_search_text: string)
    {
        // Creating Request URL with query parameter and client_id
        // let unspalsh_api_url = `https://api.unsplash.com/search/photos?query=${image_search_text}&client_id=${process.env.NEXT_PUBLIC_CLIET_ID_FOR_UNSPLASH_API_KEY}`;
        axios.get(`http://localhost:3000/imageSearch/${image_search_text}`).then(res=>{console.log("res")}).catch((error)=>console.log(error));

        // Calling UnsplashAPI with axios package  
        // await axios.get(unspalsh_api_url).then((res) => {
            // if(res.data.results)
            // {
              // getServerSideProps(image_search_text);
                setUnsplashImages(unspalsh_images);
                // setUnsplashImages(res.data.results);               
            // }
        // }).then((error)=>{ 
            // console.log(error);
        // });
    }

    // Call API only if user Input has some value
    async function searchImages()
    {
        if(searchText.length > 0)
        {
            console.log(searchText);
            await fetchImages(searchText);
            // search_image_text = searchText;
        }
        else
        {
            alert("Please Enter Some Text..")
        }
    }

    return(
        <>
            <Link href="/imageSearch">
                <a>Page Search</a>
            </Link>
            <div className="head-container">
                <h1>Image Search Application with Unspalsh API</h1>
                    <input className="input-search" type="text" name="image_search_text" 
                            placeholder="Enter Text for Images...."
                            onChange={(event) => {setSearchText(event.target.value)}}/>
                    <br/>
                <button type = "submit" className = "search-button" onClick = { searchImages }>Search Images</button>
            </div>
             
            <div className="images-container">
                {unspalshImages.map((image: any, index: number)=> <img className="image-card" src={image.urls.small} alt="unsplashImage" key={index}/>)}
            </div>            
        </>
    ) 
}

export default ImageSearch;

export async function getServerSideProps(context: any) {
    const {params} = context;
    const {query} = params;
    const image_response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.NEXT_PUBLIC_CLIET_ID_FOR_UNSPLASH_API_KEY}`);
    const images = await image_response.json();

    return {
        props: {
            unspalsh_images: images.results,
        }
    }
}