'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { LuImport } from 'react-icons/lu';
import { ModalImportarMetasProps } from '../lib/interfaces';
import { FileHandler } from '../lib/utils';

const ModalImportarMetas: React.FC<ModalImportarMetasProps> = ({
  isOpen,
  onClose,
}) => {
  const handleRefresh = () => {
    console.log('Refresh logic or action');
  };

  const { getRootProps, getInputProps, files, eliminarArchivo, subirArchivos } =
    FileHandler({
      handleRefresh,
      onClose,
    });

  const ListaArchivos = files.map((file) => (
    <li key={file.name} className="flex items-center justify-between py-1">
      {file.name} - {Math.round(file.size / 1024)} KB
      <button
        onClick={() => eliminarArchivo(file.name)}
        className="text-red-500 hover:text-red-700"
      >
        Eliminar
      </button>
    </li>
  ));

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Importar Metas
              </ModalHeader>
              <ModalBody>
              <div
          {...getRootProps({
            className: 'flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg hover:border-blue-500 cursor-pointer',
          })}
        >
          <input {...getInputProps()} />
          <p className="mb-2 font-semibold text-blue-700">
            Arrastra archivos aquí o haz clic para seleccionar
          </p>
          <LuImport className="mb-2 text-3xl text-blue-500" />
          <p className="text-sm text-gray-500">
            Soporte para múltiples archivos
          </p>
        </div>
        {files.length > 0 && (
          <aside>
            <h4 className="mb-2 mt-4 font-medium text-blue-700">
              Archivos Cargados
            </h4>
            <ul>{ListaArchivos}</ul>
          </aside>
        )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={subirArchivos} disabled={files.length === 0}>
                  Importar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalImportarMetas;
