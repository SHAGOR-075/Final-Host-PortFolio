import { useState, useEffect } from 'react';
import { Upload, FileText, Download, Trash2, CheckCircle } from 'lucide-react';
import { cvAPI } from '../lib/api';

interface CVData {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  size: number;
  mimeType: string;
  uploadedAt: string;
}

const CVUpload = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadedCv, setUploadedCv] = useState<CVData | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCV();
  }, []);

  const fetchCV = async () => {
    try {
      setLoading(true);
      const data = await cvAPI.get();
      if (data) {
        setUploadedCv(data);
      }
    } catch (error) {
      console.error('Error fetching CV:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/msword' || file.type.includes('wordprocessingml')) {
        setCvFile(file);
        setSuccess(false);
      } else {
        alert('Please upload a PDF or Word document');
      }
    }
  };

  const handleUpload = async () => {
    if (!cvFile) return;

    setUploading(true);
    setSuccess(false);

    try {
      const data = await cvAPI.upload(cvFile);
      setUploadedCv(data);
      setCvFile(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      alert(error.message || 'Failed to upload CV');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete the uploaded CV?')) {
      try {
        await cvAPI.delete();
        setUploadedCv(null);
        setSuccess(false);
      } catch (error: any) {
        alert(error.message || 'Failed to delete CV');
      }
    }
  };

  const handleDownload = () => {
    if (uploadedCv) {
      const downloadUrl = cvAPI.getDownloadUrl(uploadedCv.filename);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = uploadedCv.originalName;
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">CV Upload</h1>

      <div className="bg-card border border-border rounded-lg p-8">
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3">
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-green-400">CV uploaded successfully!</span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted">Loading CV information...</p>
          </div>
        ) : uploadedCv ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 bg-panel border border-border rounded-lg">
              <div className="p-4 bg-accent/10 rounded-lg">
                <FileText className="text-accent" size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-text mb-1">
                  {uploadedCv.originalName}
                </h3>
                <p className="text-muted text-sm">
                  CV is currently uploaded • {(uploadedCv.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-4 py-2 bg-panel hover:bg-card2 border border-border rounded-lg text-text transition-colors"
                >
                  <Download size={18} />
                  Download
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                  Delete
                </button>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-text mb-4">Upload New CV</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Select CV File (PDF or Word)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-panel border border-border rounded-lg text-text focus:outline-none focus:border-accent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent2 file:cursor-pointer"
                  />
                </div>
                {cvFile && (
                  <div className="p-4 bg-panel border border-border rounded-lg">
                    <p className="text-text text-sm">Selected: {cvFile.name}</p>
                    <p className="text-muted text-xs mt-1">
                      Size: {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
                <button
                  onClick={handleUpload}
                  disabled={!cvFile || uploading}
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-accent2 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload size={20} />
                  {uploading ? 'Uploading...' : 'Upload New CV'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
              <Upload className="mx-auto text-muted mb-4" size={48} />
              <h3 className="text-xl font-semibold text-text mb-2">Upload Your CV</h3>
              <p className="text-muted mb-6">Supported formats: PDF, DOC, DOCX</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent2 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer"
              >
                <Upload size={20} />
                Choose File
              </label>
            </div>

            {cvFile && (
              <div className="space-y-4">
                <div className="p-4 bg-panel border border-border rounded-lg">
                  <p className="text-text font-medium mb-1">{cvFile.name}</p>
                  <p className="text-muted text-sm">
                    Size: {(cvFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent2 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Upload size={20} />
                  {uploading ? 'Uploading...' : 'Upload CV'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-panel border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Instructions</h3>
        <ul className="space-y-2 text-muted text-sm">
          <li>• Upload your CV in PDF or Word format</li>
          <li>• Maximum file size: 10MB</li>
          <li>• Make sure your CV is up-to-date and professional</li>
          <li>• The CV will be available for download on your portfolio</li>
        </ul>
      </div>
    </div>
  );
};

export default CVUpload;

