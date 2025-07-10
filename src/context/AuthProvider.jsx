import { useEffect, useState } from "react";
import { signOut as authSignOut } from "../lib/auth";
import { getProfile } from "../lib/profiles";
import { supabase } from "../lib/supabase";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.dir(session, { depth: null, color: true });

        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Session loading error:", error);
      } finally {
        setLoading(false);
      }
    }

    void loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state change:", _event, session);
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      getProfile(user.id).then(({ data }) => {
        setProfile(data);
      });
    } else {
      setProfile(null);
    }
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await authSignOut();
    if (!error) {
      setUser(null);
      setProfile(null);
    }
  };

  const value = {
    user,
    profile,
    loading,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
