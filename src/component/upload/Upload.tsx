import React from 'react';
import './Upload.css';

type UploadProps = {}

type UploadState = {
    uploadFileList: FileList | null
}

class Upload extends React.Component<UploadProps, UploadState> {
    private _isMounted: boolean = false;

    constructor(props: UploadProps) {
        super(props);

        if (this._isMounted) {
            this.setState({
                uploadFileList: null
            });
        }
    }

    handleChange(selectorFiles: FileList | null) {
        if (this._isMounted) {
            this.setState({
                uploadFileList: selectorFiles
            });
        }
        console.log(selectorFiles);
    }

    render() {
        return (
            <div className="wrap">
                <div className="main">
                    <div className="option-header">
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        to
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
                </div>
            </div>
        );
    }

    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
}

export default Upload;