import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, ShieldOff } from "lucide-react";
import { selectQuota, setQuotaStatus } from "../../redux/features/quotaSlice";
import { selectIsAuthenticated } from "../../redux/features/authSlice";
import { quotaService } from "../../services/quotaService";

const QuotaBanner = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const { used, limit, warning, blocked, loaded } = useSelector(selectQuota);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchQuota = async () => {
            try {
                const status = await quotaService.getStatus();
                dispatch(setQuotaStatus(status));
            } catch {
                // Silent fail — quota banner is non-critical
            }
        };

        fetchQuota();
        intervalRef.current = setInterval(fetchQuota, 60000);

        return () => clearInterval(intervalRef.current);
    }, [isAuthenticated, dispatch]);

    if (!isAuthenticated || !loaded || (!warning && !blocked)) return null;

    if (blocked) {
        return (
            <div className="fixed top-18 left-0 w-full z-40 border-b border-danger/40 bg-danger/10 backdrop-blur-sm px-margin-edge py-3 flex items-center justify-center gap-3 select-none">
                <ShieldOff size={14} className="text-danger shrink-0" />
                <span className="font-mono text-xs text-danger uppercase tracking-wider text-center">
                    AI Interview services are temporarily unavailable because today&apos;s
                    free AI quota has been exhausted ({used}/{limit} requests used).
                    The interview section will automatically become available again
                    after the daily quota resets.
                </span>
            </div>
        );
    }

    return (
        <div className="fixed top-18 left-0 w-full z-40 border-b border-warning/40 bg-warning/10 backdrop-blur-sm px-margin-edge py-3 flex items-center justify-center gap-3 select-none">
            <AlertTriangle size={14} className="text-warning shrink-0" />
            <span className="font-mono text-xs text-warning uppercase tracking-wider text-center">
                ⚠ AI quota is almost exhausted ({used}/{limit} requests used today).
                Interview generation may become temporarily unavailable.
            </span>
        </div>
    );
};

export default QuotaBanner;
