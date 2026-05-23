import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/firebase';
import { FolderSync, FileText, UploadCloud, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminView() {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [driveFolderId, setDriveFolderId] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importStatus, setImportStatus] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'kb' | 'analytics'>('kb');
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    if (activeTab === 'analytics' && !needsAuth && !analyticsData) {
       fetch('/api/admin/analytics')
         .then(res => res.json())
         .then(data => setAnalyticsData(data))
         .catch(err => console.error("Failed to fetch analytics", err));
    }
  }, [activeTab, needsAuth, analyticsData]);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setUser(user);
        setNeedsAuth(false);
      },
      () => {
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setNeedsAuth(true);
    setFiles([]);
  };

  const fetchDriveFiles = async () => {
    if (!driveFolderId) {
      alert("Please enter a Google Drive Folder ID");
      return;
    }
    setIsLoading(true);
    const token = await getAccessToken();
    if (!token) {
       alert("No access token available. Please sign in again.");
       setIsLoading(false);
       return;
    }

    try {
      // Query files inside the specified folder
      const query = `"${driveFolderId}" in parents and trashed = false`;
      const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType)`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      setFiles(data.files || []);
      setImportStatus('');
    } catch (err: any) {
      console.error("Failed to fetch files:", err);
      alert("Error fetching files: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (fileId: string, mimeType: string, fileName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to import "${fileName}" into Umaiza's knowledge base?`
    );
    if (!confirmed) return;

    setImportStatus(`Importing ${fileName}...`);
    const token = await getAccessToken();

    try {
      const response = await fetch('/api/admin/import-drive-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId, mimeType, fileName, accessToken: token })
      });
      const data = await response.json();
      
      if (data.success) {
         setImportStatus(`Successfully imported: ${fileName}`);
      } else {
         throw new Error(data.error || "Failed to import");
      }
    } catch(err: any) {
      console.error("Import error:", err);
      setImportStatus(`Error: ${err.message}`);
    }
  };

  if (needsAuth) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2D8] p-8 max-w-sm w-full text-center">
          <ShieldAlert className="w-12 h-12 text-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-purple-deep mb-2">Admin Portal</h2>
          <p className="text-slate-600 mb-8 text-sm">Sign in with your Google Workspace account to manage Umaiza's Knowledge Base data.</p>
          
          <button 
            onClick={handleLogin} 
            disabled={isLoggingIn}
            className="w-full relative shadow-md bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            {isLoggingIn ? "Signing in..." : "Sign in with Google"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-purple-deep mb-2">Admin Portal</h1>
          <p className="text-slate-600">Manage Umaiza's Knowledge Base and view engagement analytics.</p>
        </div>
        <button onClick={handleLogout} className="text-sm font-semibold text-slate-500 hover:text-purple-deep transition">
           Sign Out
        </button>
      </div>
      
      <div className="flex gap-4 mb-8 border-b border-[#E8E2D8] pb-2">
         <button 
           onClick={() => setActiveTab('kb')}
           className={`font-semibold text-sm pb-2 border-b-2 transition ${activeTab === 'kb' ? 'border-gold text-purple-deep' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
         >
           Knowledge Base
         </button>
         <button 
           onClick={() => setActiveTab('analytics')}
           className={`font-semibold text-sm pb-2 border-b-2 transition ${activeTab === 'analytics' ? 'border-gold text-purple-deep' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
         >
           Analytics & Activity
         </button>
      </div>

      {activeTab === 'kb' && (
      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar / Controls */}
        <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-sm h-fit">
          <h2 className="font-bold text-purple-deep mb-4 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-gold" /> Import from Drive
          </h2>
          <div className="mb-4">
             <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Folder ID</label>
             <input 
               type="text" 
               placeholder="1A2b3C4d5E..." 
               value={driveFolderId}
               onChange={(e) => setDriveFolderId(e.target.value)}
               className="w-full px-4 py-2 border border-[#E8E2D8] rounded-lg text-sm bg-cream focus:outline-none focus:border-gold"
             />
             <p className="text-xs text-slate-400 mt-2">Open the folder in Drive and copy the ID from the URL.</p>
          </div>
          <button 
            onClick={fetchDriveFiles} 
            disabled={isLoading || !driveFolderId}
            className="w-full bg-purple-deep text-white font-bold py-2.5 rounded-lg text-sm hover:bg-[#1E0A4E]/90 transition disabled:opacity-50"
          >
            {isLoading ? "Fetching..." : "Fetch Files"}
          </button>
        </div>

        {/* File List */}
        <div className="md:col-span-2">
           <div className="bg-white p-6 rounded-2xl border border-[#E8E2D8] shadow-sm min-h-[400px]">
             {importStatus && (
               <div className="mb-4 bg-cream/50 text-purple-deep text-sm font-medium p-3 rounded-lg border border-gold/20 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-gold" />
                  {importStatus}
               </div>
             )}
             
             <h2 className="font-bold text-purple-deep mb-4 border-b border-[#E8E2D8] pb-3">Available Documents</h2>
             
             {files.length === 0 ? (
                <div className="text-center text-slate-400 py-12 flex flex-col items-center gap-3">
                   <FolderSync className="w-8 h-8 opacity-50" />
                   <p className="text-sm">No files fetched yet or folder is empty.</p>
                </div>
             ) : (
                <ul className="space-y-3">
                   {files.map(file => (
                     <li key={file.id} className="flex justify-between items-center p-4 border border-[#E8E2D8] rounded-xl hover:border-gold/30 transition">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gold shrink-0" />
                          <div>
                            <p className="font-semibold text-sm text-purple-deep line-clamp-1">{file.name}</p>
                            <p className="text-xs text-slate-400 font-mono mt-0.5">{file.mimeType}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => handleImport(file.id, file.mimeType, file.name)}
                          className="bg-gold/10 text-purple-deep font-bold text-xs px-4 py-2 rounded-lg hover:bg-gold hover:text-white transition whitespace-nowrap ml-4"
                        >
                          Import Data
                        </button>
                     </li>
                   ))}
                </ul>
             )}
           </div>
        </div>
      </div>
      )}
      {activeTab === 'analytics' && (
        <div className="bg-white p-8 rounded-2xl border border-[#E8E2D8] shadow-sm">
           <h2 className="font-bold text-2xl text-purple-deep mb-6">Platform Analytics</h2>
           {!analyticsData ? (
             <p className="text-slate-500">Loading analytics...</p>
           ) : (
             <>
               <div className="grid md:grid-cols-3 gap-6 mb-10">
                 <div className="bg-cream/50 p-6 rounded-xl border border-gold/20 flex flex-col items-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Total Queries</p>
                    <p className="text-4xl font-serif text-purple-deep font-bold">{analyticsData.totalChatQueries || 0}</p>
                 </div>
                 <div className="bg-cream/50 p-6 rounded-xl border border-gold/20 flex flex-col items-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Waitlist Signups</p>
                    <p className="text-4xl font-serif text-purple-deep font-bold">{analyticsData.totalWaitlist || 0}</p>
                 </div>
                 <div className="bg-cream/50 p-6 rounded-xl border border-gold/20 flex flex-col items-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Active Leads</p>
                    <p className="text-4xl font-serif text-purple-deep font-bold">{analyticsData.totalLeads || 0}</p>
                 </div>
               </div>
               
               <h3 className="font-bold text-purple-deep mb-4 border-b border-[#E8E2D8] pb-3">Recent Queries</h3>
               <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {analyticsData.recentQueries && analyticsData.recentQueries.length > 0 ? analyticsData.recentQueries.map((q: any) => (
                    <div key={q.id} className="p-4 border border-[#E8E2D8] rounded-xl flex gap-3 text-sm">
                      <div className="text-gold mt-0.5">Q:</div>
                      <div className="flex-1">
                        <p className="text-purple-deep font-medium">{q.query}</p>
                      </div>
                    </div>
                  )) : (
                    <p className="text-slate-500 text-sm italic">No recent queries found.</p>
                  )}
               </div>
             </>
           )}
        </div>
      )}
    </div>
  );
}
