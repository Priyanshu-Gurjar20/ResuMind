<div className="job-match-detail-grid">
  <div className="job-match-detail-card matching-card">
    <div className="job-match-card-heading">
      <span className="job-match-card-icon">✓</span>
      <h4>Missing Skills</h4>
    </div>

    {(jobAnalysisResult.data.matchingSkills || []).length > 0 ? (
      <div className="job-match-tags">
        {jobAnalysisResult.data.matchingSkills.map((item, i) => (
          <span className="job-match-tags" key={i}>
            {item}
          </span>
        ))}
      </div>
     ) : (
      <p className="job-match-empty">No matching Skills</p>
    )}
  </div>

  <div className="job-match-detail-card missing-card">
    <div className="job-match-card-heading">
      <span className="job-match-card-icon">!</span>
      <h4>Missing Skills</h4>
  </div>

  <div className=""></div>
</div>
</div>