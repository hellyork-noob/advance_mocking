              </div>
            )}
            <div className="p4g-total">
              <span>
                Skipped: {totals.unattempted} · Attempted:{" "}
                {totals.correct + totals.incorrect}
              </span>
              <strong>
                Total: {totals.score.toFixed(2)} / {totals.maxScore}
              </strong>
            </div>
          </div>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="formactions">
            <button type="button" className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="primary" type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function ExamForm({ onSave }: { onSave: () => void }) {
  return (
    <form
      className="panel inlineform"
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        await db.exams.add({
          name: String(f.get("name")),
          date: String(f.get("date")),
        });
        e.currentTarget.reset();
        onSave();
      }}
    >
      <label>
        Exam name
        <input name="name" required placeholder="Your exam name" />
      </label>
      <label>
        Exam date
        <input name="date" type="date" required />
      </label>
      <button className="primary">Add exam</button>
    </form>
  );
}
function PlaylistForm({ onSave }: { onSave: () => void }) {
  return (
    <form
      className="panel inlineform"
      onSubmit={async (e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const url = String(f.get("url"));
        if (!/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) {
          alert("Enter a YouTube URL.");
          return;
        }
        await db.playlists.add({
          title: String(f.get("title")),
          url,
          completed: false,
        });
        e.currentTarget.reset();
        onSave();
      }}
    >
      <label>
        Playlist name
        <input name="title" required placeholder="Your playlist name" />
      </label>
      <label>
        YouTube playlist URL
        <input
          name="url"
          type="url"
          required
          placeholder="https://www.youtube.com/playlist?list=..."
        />
      </label>
      <button className="primary">Add playlist</button>
    </form>
  );
}
// No automatic database deletion on startup.
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </React.StrictMode>,
);

function AutoBackupPanel({ onRestored }: { onRestored: () => void }) {
  const [snapshots, setSnapshots] = useState<
    Array<{ id: number; createdAt: string; total: number }>
  >([]);
  const [message, setMessage] = useState("");
  const [persistent, setPersistent] = useState<boolean | null>(null);
  const refreshList = async () => {
    try {
      setSnapshots(await listSnapshots());
      setPersistent(await isStoragePersistent());
      setMessage("");
    } catch (e) {
      setMessage("Backup vault error: " + String(e));
    }
  };
  useEffect(() => {
    void refreshList();
    const timer = setInterval(() => void refreshList(), 30000);
    return () => clearInterval(timer);
  }, []);
  const create = async () => {
    try {
      const saved = await captureSnapshot();
      await refreshList();
      setMessage(
        saved
          ? "Snapshot saved."
          : "No changes to save (or workspace is empty).",
      );
    } catch (e) {
      setMessage("Backup failed: " + String(e));
    }
  };
  const restore = async (id: number) => {
    if (
      !confirm(
        "Restore this automatic snapshot? This REPLACES all current records. Export a JSON backup first.",
      )
    )
      return;
    try {
      await restoreSnapshot(id);
      onRestored();
      await refreshList();
      alert("Snapshot restored. Check your exams and mocks.");
    } catch (e) {
      setMessage("Restore failed: " + String(e));
    }
  };
  return (
    <div className="settingrow" style={{ display: "block" }}>
      <h3>Automatic backup protection</h3>
      <p>
        Changed data is copied to a separate browser backup vault approximately
        every 20 seconds. Up to 15 versions are retained. Empty data never
        replaces a saved snapshot.
