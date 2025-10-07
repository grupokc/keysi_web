import { useState, useRef, ChangeEvent } from "react";

interface FileUploadProps {
  name: string;
  label: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  list?: boolean;
  [key: string]: any;
}

interface FileItem {
  id: string;
  name: string;
  type: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  error,
  onChange = () => {},
  list,
  ...props
}) => {
  const file = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [open, setOpen] = useState(false);

  const isOpen = open ? "rotate-180" : "";
  const isOpenList = open ? "block opacity-100" : "hidden opacity-0";
  const haveFiles = files.length > 0;

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const currentFiles = e.target.files;
    if (!currentFiles || currentFiles.length === 0) return;

    const dataFile = currentFiles[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const event = {
        target: {
          name: name,
          value: reader.result as string,
        },
      } as ChangeEvent<HTMLInputElement>;
      onChange(event);
    };

    setFiles([
      {
        id: crypto.randomUUID(),
        name: dataFile.name,
        type: dataFile.type,
      },
    ]);
    if (dataFile) reader.readAsDataURL(dataFile);
  };

  const removeFile = (id: string) => {
    const neFiles = files.filter((file) => file.id !== id);
    setFiles(neFiles);
  };

  if (!name || !label) {
    return null;
  }

  return (
    <div className="w-full max-h-[74px] relative">
      <div className="text-white px-3 py-2 bg-blue-600">
        <div className="justify-between">
          <p className="font-medium">{label}</p>
          <p className="text-xs text-white text-opacity-90 whitespace-nowrap text-ellipsis overflow-hidden">
            {list ? "Añadir archivo" : `${files[0] ? files[0].name : "Añadir archivo"}`}
          </p>
        </div>
        <input
          ref={file}
          className="file:hidden text-transparent absolute top-0 left-0 bottom-0 right-0"
          type="file"
          name={name}
          onChange={handleFile}
          {...props}
        />
      </div>
      {list && (
        <div className="relative p-2 bg-blue-100 flex items-center justify-between">
          <p className="text-[12px]">{`Archivos (${files.length})`}</p>
          <i
            className={`${
              haveFiles ? "" : "opacity-40"
            } text-[14px] fas fa-chevron-down transform transition-transform duration-[700ms] ${isOpen}`}
            onClick={() => {
              if (haveFiles) setOpen(!open);
            }}
          />
        </div>
      )}
      <ul className={`${isOpenList} bg-white transition-all text-sm absolute w-full top-[74px] z-10`}>
        {files.map((file) => (
          <li className="p-2 flex justify-between items-center py-1" key={file.id}>
            <p className="text-ellipsis whitespace-nowrap overflow-hidden">{file.name}</p>
            <i className="ml-5 fas fa-trash-alt text-red-600" onClick={() => removeFile(file.id)} />
          </li>
        ))}
      </ul>
      {error && (
        <span className="text-red-600 mt-1">
          <small>{error}</small>
        </span>
      )}
    </div>
  );
};

export default FileUpload;
