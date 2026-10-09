import React, { useState } from 'react'
import AdminTabBar from '../../components/layout/AdminTabBar'
import SegmentedControl from '../../components/ui/SegmentedControl'
import Button from '../../components/ui/Button'
import Tag from '../../components/ui/Tag'
import EmptyState from '../../components/ui/EmptyState'
import { useStore } from '../../store/useStore'

const severityVariant: Record<string, string> = {
  high: 'coral', medium: 'gold', low: 'grey'
}

export default function AdminReports() {
  const { reports, resolveReport, reviewReport, showToast } = useStore()
  const [tabIdx, setTabIdx] = useState(0)

  const openReports = reports.filter(r => r.status === 'open')
  const inReview = reports.filter(r => r.status === 'in_review')
  const resolved = reports.filter(r => r.status === 'resolved')

  const shown = tabIdx === 0 ? openReports : tabIdx === 1 ? inReview : resolved

  const handleResolve = (id: string) => {
    resolveReport(id)
    showToast('Marked resolved')
  }

  const tabOptions = [
    `Open · ${openReports.length}`,
    `In review · ${inReview.length}`,
    'Resolved',
  ]
  const tab = tabOptions[tabIdx] || tabOptions[0]

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-[18px] pt-12 pb-4">
        <h1 className="text-[21px] font-extrabold text-ink">Reports</h1>
        <p className="text-sm text-mute">User reports</p>
      </div>

      <div className="px-[18px] mb-4">
        <SegmentedControl options={tabOptions} value={tab} onChange={(v) => setTabIdx(tabOptions.indexOf(v))} />
      </div>

      <div className="flex-1 overflow-y-auto px-[18px] flex flex-col gap-3 pb-6">
        {shown.length === 0 ? (
          <EmptyState emoji="📋" title="Nothing here" subtitle="No reports in this category." />
        ) : (
          shown.map(report => (
            <div key={report.id} className="bg-white border border-line rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tag variant={severityVariant[report.severity] as any}>{report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}</Tag>
                <p className="text-[14px] font-bold text-ink flex-1">{report.type}</p>
              </div>
              <p className="text-xs text-mute">Reported by <strong className="text-ink">{report.reportedBy}</strong> · against <strong className="text-ink">{report.against}</strong></p>
              <p className="text-xs text-mute mt-[2px]">Item: {report.item}</p>
              <div className="flex gap-2 mt-3">
                <Button variant="ghost" size="s" fullWidth={false} className="flex-1" onClick={() => { reviewReport(report.id); showToast('Moved to in review') }}>Review</Button>
                <Button size="s" fullWidth={false} className="flex-1" onClick={() => handleResolve(report.id)}>Resolve</Button>
              </div>
            </div>
          ))
        )}
      </div>

      <AdminTabBar />
    </div>
  )
}
