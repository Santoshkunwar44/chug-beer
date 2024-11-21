import { useRef, useState } from "react";
import useUploadFile from "../../hooks/useUploadFile";
import { api } from "../../utils/api";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { Upload } from "lucide-react";
import useToast from "../../hooks/useToast";
import ReusableModal from "../../shared/Modal";

const UploadVideoContent = ({
  entryId,
  success,
}: {
  entryId: string;
  success: () => void;
}) => {
  const { uploadImage } = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.stopPropagation();

    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.stopPropagation();

    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    e.stopPropagation();

    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);

      e.dataTransfer.clearData();
    }
  };

  const handleUploadVideoToCloud = async () => {
    if (!selectedFile || !entryId) return;
    setIsUploading(true);
    try {
      uploadImage(selectedFile, async (err, url) => {
        if (err) {
          console.log(err);
          return;
        }
        const { status } = await api.uploadVideoToEntryApi(entryId, url);
        if (status === 200) {
          showToast("Video uploaded successfully", "success");
          success();
        }
        setIsUploading(false);
      });
    } catch (error) {
      showToast("Failed to upload video", "error");
      setIsUploading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-transparent">
          <CardBody>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : "border-gray-300 hover:border-[#7242f5]"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                disabled={isUploading}
              />
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                {selectedFile
                  ? `File selected: ${selectedFile.name}`
                  : "Drag and drop a file here, or click to select a file"}
              </p>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              isDisabled={isUploading || !selectedFile}
              onPress={handleUploadVideoToCloud}
              className="w-full bg-[#7242f5] text-white"
            >
              {isUploading ? "Uploading" : "Upload"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

const UploadVideo = ({
  entryId,
  success,
}: {
  entryId: string;
  success: () => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hideActionButton={true}
        backdrop="blur"
        actionButtonClick={() => {}}
        bodyContent={
          <>
            <UploadVideoContent entryId={entryId} success={success} />
          </>
        }
        title="Upload video for this entry"
        actionButtonText="upload video"
        button={
          <Button className="bg-[#7C3AED]" onClick={() => setIsModalOpen(true)}>
            Upload video
          </Button>
        }
      ></ReusableModal>
    </div>
  );
};

export default UploadVideo;
