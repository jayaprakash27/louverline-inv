import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { app } from "../firebase";
import Loader from "./Loader";
import { useSelector } from "react-redux";
const PriceList = () => {
  const [pdfAsset, setPdfAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const storage = getStorage(app);
  const storageRef = ref(storage, `pdf/pricelist.pdf`);
  const signedInUser = useSelector((state) => state.signedInUser);
  const uploadPdf = (e) => {
    setIsLoading(true);
    const pdfFile = e.target.files[0];
    const uploadTask = uploadBytesResumable(storageRef, pdfFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        toast.error("Error while uploading: Try again!");
        setTimeout(() => {
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setPdfAsset(downloadURL);
          setIsLoading(false);
          toast.success("PDF uploaded successfully!");
        });
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, pdfAsset);
    deleteObject(deleteRef).then(() => {
      setPdfAsset(null);
      setIsLoading(false);
      toast.success("PDF deleted successfully!");
    });
  };

//   const saveDetails = () => {
//     setIsLoading(true);
//     try {
//         if(!pdfAsset){
//         setFields(true);
//         setMsg('Can not be empty!');
//         setAlertSts('danger');
//         setTimeout(() => {
//             setFields(false);
//         setIsLoading(false);
//         }, 4000);
//         } else {
//             const data = {
//                 id: `${Date.now()}`,
//                 imageURL: pdfAsset,
//             };
//             saveData(data);
//             setIsLoading(false);
//             setFields(true);
//             console.log(data);
//             setMsg('PDF uploaded Successfully!');
//             setAlertSts('success');
//             setTimeout(() => {
//                 setFields(false);
//             }, 4000);
//         }
//     } catch (error) {
//         console.log(error);
//         setFields(true);
//         setIsLoading(false);
//         setMsg('Error while uploading: Try again!');
//         setAlertSts('danger');
//         setTimeout(() => {
//             setFields(false);

//         }, 4000);
//     }
// };
//   const  saveData = (data) =>{
//     try {
//         const userRef = collection(db, 'pdfs', `${Date.now}`);
//         setDoc(doc(userRef, `${Date.now}`), {
//             data
//         });
//         toast.success('Updated! ');
//       } catch (e) {
//         toast.error(e);
//       }
//   }


//   const fetchData = async () => {
//   const pdfRef = doc(db, "pdfs");
//   const pdfUrl = await getDoc(pdfRef);
//   console.log(pdfUrl.data()[0]);
//   setNowPdf(pdfUrl.data()[0]);
//   }


  useEffect(() => {
    getDownloadURL(storageRef).then((downloadURL) =>{
        setPdfAsset(downloadURL);
    })
  }, [])
  return (
    <div className=" w-full">
      <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-500 w-full h-full cursor-pointer rounded-lg">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {!pdfAsset && signedInUser && signedInUser === "admin@mail.com" ? (
              <>
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className=" gap-2 w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700">
                    <MdCloudUpload className=" text-3xl " />
                    <p>Click here to upload the Pdf.</p>
                  </div>
                  <input
                    type="file"
                    name="uploadpdf"
                    id="uploadpdf"
                    accept="pdf/*"
                    onChange={uploadPdf}
                    className="w-0 h-o"
                  />
                </label>
              </>
            ) : (
              <>
                <div className=" h-full w-full">
                  <iframe
                    src={pdfAsset}
                    className=" w-full h-full"
                  />
                  { signedInUser && signedInUser === "admin@mail.com" && (<button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-150 transition-all ease-in-out"
                    onClick={deleteImage}
                  >
                    <MdDelete className="text-white" />
                  </button>)}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {/* <iframe
        src={`${pdfAsset}`}
        title="testPdf"
        className=" h-screen"
        height="100%"
        width="100%"
      /> */}
    </div>
  );
};

export default PriceList;