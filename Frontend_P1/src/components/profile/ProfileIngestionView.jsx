import React, { useState } from "react";
import { UploadCloud, ArrowRight, FileCheck, RefreshCw, AlertTriangle } from "lucide-react";
import AbortPopup from "../ui/AbortPopup";

const ProfileIngestionView = () => {
  const [file, setFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSaveConfig = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("CONFIGURATION PROFILE SYNCD TO SYSTEM STORAGE BASE");
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between py-6 space-y-8">
      
      {/* SECTION 4: DATA INGESTION RESUME UPLOAD */}
      <div className="w-full flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
        <div className="mb-6 select-none">
          <span className="font-mono text-[10px] text-neon-blue mb-1 block uppercase tracking-[0.3em] font-bold">
            Ingestion Node // Vector_Core
          </span>
          <h2 className="font-scene-focus text-2xl md:text-4xl text-pure-white uppercase font-black tracking-tight border-b-4 border-frame pb-3">
            Data Ingestion
          </h2>
        </div>

        {/* Hidden Native File Anchor */}
        <label 
          htmlFor="resume-upload"
          className="border-2 border-dashed border-frame bg-panel/20 p-10 md:p-16 text-center group hover:border-neon-blue/60 transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]"
        >
          <div className="absolute inset-0 bg-neon-blue opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" />
          <input 
            type="file" 
            id="resume-upload" 
            accept=".pdf"
            className="hidden" 
            onChange={handleFileChange}
          />
          
          {file ? (
            <>
              <FileCheck size={64} className="text-success mb-6 animate-pulse" strokeWidth={1.5} />
              <div className="font-scene-focus text-xl md:text-2xl text-pure-white uppercase tracking-tighter mb-2 font-black">
                {file.name}
              </div>
              <div className="font-mono text-[10px] text-success tracking-widest font-bold">
                [( ${(file.size / (1024 * 1024)).toFixed(2)} MB ) // BUFFER_READY_FOR_INGESTION]
              </div>
            </>
          ) : (
            <>
              <UploadCloud size={64} className="text-steel group-hover:text-neon-blue mb-6 transition-colors duration-300" strokeWidth={1.5} />
              <div className="font-scene-focus text-xl md:text-2xl lg:text-3xl text-pure-white uppercase tracking-tighter mb-3 font-black">
                UPLOAD RESUME (.PDF)
              </div>
              <div className="font-mono text-[10px] text-steel tracking-widest select-none font-bold">
                MAX FILE SIZE: 10MB // ENCRYPTED MILITARY TRANSFER PIPELINE
              </div>
            </>
          )}
        </label>
      </div>

      {/* SECTION 5: GLOBAL TACTICAL ACTION TRIGGER BAR */}
      <div className="w-full flex flex-col justify-center items-center pt-4 flex-shrink-0 space-y-6">
        <button
          onClick={handleSaveConfig}
          disabled={isSaving}
          className="bg-neon-blue text-abyss font-mono text-sm md:text-base font-black uppercase tracking-[0.25em] px-16 h-16 hover:bg-pure-white hover:text-ink transition-all duration-500 button-cut cursor-pointer shadow-[0_0_30px_rgba(0,136,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center gap-4 group w-full sm:w-auto"
        >
          {isSaving ? (
            <>
              <RefreshCw size={18} className="animate-spin" strokeWidth={2.5} />
              SYNCING CONFIG...
            </>
          ) : (
            <>
              <span>SAVE CONFIGURATION</span>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" strokeWidth={2.5} />
            </>
          )}
        </button>

        {/* DANGER ZONE */}
        <button
          onClick={() => setIsDeletePopupOpen(true)}
          className="font-mono text-[10px] md:text-xs text-danger/70 hover:text-danger tracking-[0.2em] font-bold uppercase transition-colors duration-300 flex items-center gap-2 group select-none mt-2"
        >
          <AlertTriangle size={14} className="text-danger opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={2.5} />
          [ PURGE_ACCOUNT_RECORD ]
        </button>
      </div>

      <AbortPopup 
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={() => {
          setIsDeletePopupOpen(false);
          alert("ACCOUNT DATA PURGED FROM SYSTEM BASE.");
        }}
        title="INITIATE DATA PURGE?"
        message="Warning: This action is irreversible. All career nodes and vector configurations will be permanently erased. Proceed with termination?"
        confirmText="PURGE DATA"
        cancelText="ABORT"
      />
    </div>
  );
};

export default ProfileIngestionView;