const rootURL = "https://te-gym-api.herokuapp.com";

import RNFetchBlob from "rn-fetch-blob";

import {getOSPath} from "../../utils/utils";

import uploadImage from '../../API/storage'

const getFileExtension = (path) => path.slice(((path.lastIndexOf(".") - 1) >>> 0) + 2);



export const postActionList = (token) => {


  return async function (dispatch) {
    const data = await fetch(rootURL + "/post/myPosts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const jsondata = await data.json();
    console.log("tycoonRahullllll ::", jsondata);
    dispatch({
      type: "GET_POST",
      payload: jsondata,
    });
  };
};

export const CreatePostAction = async(data,token) => {
  const { path , textContent} = data

  path = getOSPath(path);
  let fileExtension = getFileExtension(path);
  console.log("Uploading frommmmmmmmmmm ", path);


  const uploadData =
    {
      name: "mediaContent",
      filename: path,
      type: "image/" + fileExtension,
      data: RNFetchBlob.wrap(path),
    },


  return async function (dispatch) {
  let response = await RNFetchBlob.fetch(
    "POST",
    rootURL + '/post',
    {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
    uploadData,textContent
  );
  console.log(response.data);
  
  const { data} = response

  //   let formData = new FormData();
  //   // formData.append('mediaContent', {
  //   //    uri: mediaContent,
  //   //   })
  //  formData.append('mediaContent', {
  //   uri: mediaContent,
   
  //   type: "image/jpeg"
  //  });
  //   formData.append('textContent', textContent);



  //   console.log("Goes to Server",data,token )
  // return async function (dispatch) {
    // const data = await fetch(rootURL + "/post", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'multipart/form-data'
    //   },
    //   body:formData
    // });

    const jsondata = await data.json();

    console.log("From Sever Side Data", jsondata);

    dispatch({
      type: "CREATE_POST",
      payload: jsondata,
    });
  };
};
