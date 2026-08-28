import { Skeleton } from "antd";
import "../../AdminCompanyDetail/CompanyDetailsPage.css";

/**
 * CompanyDetailsSkeleton
 * Loading placeholder for CompanyProfilePage, built from antd's
 * <Skeleton> primitives but laid out inside the same .cp-card / .cp-*
 * classes as the real page, so the loading state matches the final
 * layout exactly (no shift when data arrives).
 *
 * ASSUMPTION: your project has antd installed (`npm install antd`) and
 * its base stylesheet imported somewhere globally (e.g.
 * `import "antd/dist/reset.css"` in your root index/App file). If antd
 * isn't set up yet, that import is the only extra step needed — this
 * component doesn't need any other antd config.
 *
 * Usage: render this in place of CompanyProfilePage's content while
 * `loading` is true (see the one-line change noted in
 * CompanyProfilePage.js).
 */
const CompanyDetailsSkeleton = () => {
    return (
        <div className="cp-page">
            {/* Heading + breadcrumb */}
            <div className="cp-heading">
                <Skeleton.Input active size="small" style={{ width: 160, height: 22, marginBottom: 10 }} />
                <Skeleton.Input active size="small" style={{ width: 240, height: 14 }} />
            </div>

            {/* Header card */}
            <div className="cp-card cp-header-card">
                <div className="cp-header-left">
                    <Skeleton.Avatar active shape="square" size={108} style={{ borderRadius: 12 }} />
                    <div>
                        <div className="cp-name-row">
                            <Skeleton.Input active size="small" style={{ width: 160, height: 20 }} />
                            <Skeleton.Button active size="small" shape="round" style={{ width: 64, height: 22 }} />
                        </div>
                        <div className="cp-contact-list">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <Skeleton.Input key={i} active size="small" style={{ width: 180, height: 14 }} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="cp-header-meta">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton.Input key={i} active size="small" style={{ width: 260, height: 14 }} />
                    ))}
                </div>

                <Skeleton.Button active shape="default" style={{ position: "absolute", top: 20, right: 20, width: 130, height: 34 }} />
            </div>

            {/* Company Overview */}
            <div className="cp-card">
                <Skeleton.Input active size="small" style={{ width: 180, height: 18, marginBottom: 16 }} />
                <div className="cp-overview-grid">
                    <div className="ov-about">
                        <Skeleton.Input active size="small" style={{ width: 110, height: 14, marginBottom: 10 }} />
                        <Skeleton active title={false} paragraph={{ rows: 3, width: ["100%", "100%", "70%"] }} />
                    </div>
                    <div className="ov-cards">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div className="ov-card" key={i}>
                                <Skeleton.Avatar active shape="square" size={34} style={{ borderRadius: 8 }} />
                                <div style={{ flex: 1 }}>
                                    <Skeleton.Input active size="small" style={{ width: "80%", height: 12, marginBottom: 6 }} />
                                    <Skeleton.Input active size="small" style={{ width: "60%", height: 12 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Registered Address + Contact Person */}
            <div className="cp-row-two">
                <div className="cp-card">
                    <Skeleton.Input active size="small" style={{ width: 180, height: 18, marginBottom: 16 }} />
                    <div className="cp-address-grid">
                        <div className="cp-address-item cp-address-full">
                            <Skeleton.Input active size="small" style={{ width: 100, height: 12, marginBottom: 6 }} />
                            <Skeleton.Input active size="small" style={{ width: "70%", height: 14 }} />
                        </div>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div className="cp-address-item" key={i}>
                                <Skeleton.Input active size="small" style={{ width: 80, height: 12, marginBottom: 6 }} />
                                <Skeleton.Input active size="small" style={{ width: "60%", height: 14 }} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cp-card">
                    <Skeleton.Input active size="small" style={{ width: 150, height: 18, marginBottom: 16 }} />
                    <div className="cp-address-grid">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div className="cp-address-item" key={i}>
                                <Skeleton.Input active size="small" style={{ width: 80, height: 12, marginBottom: 6 }} />
                                <Skeleton.Input active size="small" style={{ width: "70%", height: 14 }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Documents & Assets */}
            <div className="cp-card">
                <Skeleton.Input active size="small" style={{ width: 190, height: 18, marginBottom: 16 }} />
                <div className="cp-docs-grid">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div className="cp-doc" key={i}>
                            <Skeleton.Avatar active shape="square" size={34} style={{ borderRadius: 8 }} />
                            <div style={{ flex: 1 }}>
                                <Skeleton.Input active size="small" style={{ width: "80%", height: 12, marginBottom: 6 }} />
                                <Skeleton.Input active size="small" style={{ width: "40%", height: 11 }} />
                            </div>
                            <Skeleton.Avatar active shape="square" size={28} style={{ borderRadius: 6 }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CompanyDetailsSkeleton;