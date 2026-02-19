import { Slot, Redirect } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";

export default function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Redirect href="/" />;

  return <Slot />;
}
 