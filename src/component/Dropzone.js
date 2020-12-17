import './Dropzone.css';
import handleFiles from '../logic/handleFiles.js';

function Dropzone(props){
    const dropHandler = (event) => {
        console.log('File dropped');
        event.preventDefault();
        const items = event.dataTransfer.items;

        handleFiles(items, props.setImage);
    }

    const dragOver = (event) => { event.preventDefault(); } // Need this for the drop to work

    // img must have id to be able to pass document element to LenaJS
    return(
        <div
            className='dropzone'
            onDragOver={dragOver}
            onDrop={dropHandler}>
                {props.render() ? null : 'Paste image from clipboard or drag and drop here'}
                <img id="image" src={props.render()} alt=''/>
        </div>
    );
}

export default Dropzone;
