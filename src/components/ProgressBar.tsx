// ProgressBar.tsx
export default function ProgressBar({ progress, step, total }: { progress: number; step?: number; total?: number }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {step && total && (
        <div className="progress-label">
          Step {step} of {total}
        </div>
      )}
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
