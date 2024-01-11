import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Type.css';
import { useState } from 'react';
import { updateDoc, collection, doc, onSnapshot } from 'firebase/firestore';
import { dataStore } from './firebase';

function Type(props) {
    const [content, setContent] = useState('');
    const param = useParams();
    const collectionRef = collection(dataStore, 'docs');
    const isMounted = useRef();
  
    const [documentTitle, setDocumentTitle] = useState('');

    const handleContentChange = (newValue) => {
        setContent(newValue);
    };

    useEffect(() => {
        const updateDocsData = setTimeout(() => {
            const document = doc(collectionRef, param.id);
            if (content !== undefined && content !== null) {
                updateDoc(document, {
                    docsDesc: content,
                })
                .then(() => {
                    console.log('Document updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating document:', error);
                });
            }
        }, 100);
        return () => clearTimeout(updateDocsData);
    }, [content, param.id]);

    const fetchData = () => {
        const document = doc(collectionRef, param.id);
        onSnapshot(document, (docs) => {
            if (docs.exists()) {
                setDocumentTitle(docs.data().title);
                setContent(docs.data().docsDesc);
            } else {
                console.error('Document not found');
            }
        });
    }

    useEffect(() => {
        if (isMounted.current) {
            return;
        }

        isMounted.current = true;
        fetchData();
    }, [param.id]);

    return (
        <div className='container'>
            <h1>{documentTitle}</h1>
            <ReactQuill value={content} onChange={handleContentChange} />
        </div>
    );
}

export default Type;
