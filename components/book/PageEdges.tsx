'use client';

import React from 'react';

interface PageEdgesProps {
  leafIndex: number;
  totalLeaves: number;
}

export const PageEdges: React.FC<PageEdgesProps> = ({ leafIndex, totalLeaves }) => {
  const leftLeavesCount = leafIndex;
  const rightLeavesCount = totalLeaves - leafIndex;

  return (
    <>
      {/* Left Stack Depth (revealed when leaves have turned) */}
      {leftLeavesCount > 0 && (
        <div
          className="page-edge-stack-left"
          style={{ width: `${Math.min(12, leftLeavesCount * 1.8)}px`, left: `-${Math.min(12, leftLeavesCount * 1.8)}px` }}
          aria-hidden="true"
        />
      )}

      {/* Right Stack Depth (remaining leaves) */}
      {rightLeavesCount > 0 && (
        <div
          className="page-edge-stack-right"
          style={{ width: `${Math.min(12, rightLeavesCount * 1.8)}px`, right: `-${Math.min(12, rightLeavesCount * 1.8)}px` }}
          aria-hidden="true"
        />
      )}
    </>
  );
};
