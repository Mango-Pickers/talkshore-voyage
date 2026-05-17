import { Navigate } from "react-router-dom";

import { useApp } from "@/hooks/useApp";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({
  children,
}: Props) => {
  const {
    user,
    loading,
  } = useApp();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
        <div className="text-lg">
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/auth"
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;