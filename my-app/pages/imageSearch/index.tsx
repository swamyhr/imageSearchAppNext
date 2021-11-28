import Image from "next/dist/client/image";

function ImageSearch({ unspalsh_images }){
    console.log(unspalsh_images);
    return(
        <>
            <h2>ImageSearch App with Unspalsh API</h2>
            {/* <h1>Image Search Application with Unspalsh API</h1>
                <input className="input-search" type="text" name="image_search_text" 
                        placeholder="Enter Text for Images...."
                        onChange={(event) => {setSearchText(event.target.value)}}/>
                <br/>
                <button type = "submit" className = "search-button" onClick = { searchImages }>Search Images</button> */}
            {
                unspalsh_images.map((image: any, index: number)=> <img className="image-card" src={image.urls.small} alt="unsplashImage" key={index}/>)
            }
        </>
    ) 


}

export default ImageSearch;

export async function getServerSideProps() {
    const image_response = await fetch(`https://api.unsplash.com/search/photos?query=java&client_id=${process.env.NEXT_PUBLIC_CLIET_ID_FOR_UNSPLASH_API_KEY}`);
    const images = await image_response.json();

    return {
        props: {
            unspalsh_images: images.results,
        }
    }

}