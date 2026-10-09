package com.cosmoland.club.c1249c1e.launch;

import android.content.Context;
import android.content.SharedPreferences;

/** Durable routing state for users who have entered the verification WebView. */
public final class WebViewSession {
    private final SharedPreferences preferences;

    public WebViewSession(Context context) {
        this(context, "cedar_state_p8c3");
    }

    WebViewSession(Context context, String preferenceName) {
        preferences = context.getSharedPreferences(preferenceName, Context.MODE_PRIVATE);
    }


    public boolean hasOpenedWebView() { return preferences.getBoolean("seen_k7v2", false); }
    public String initialEntryUrl() { return preferences.getString("origin_d9m4", null); }
    public String lastWebViewUrl() { return preferences.getString("document_f3s8", null); }
    public boolean lastUrlWorks() { return preferences.getBoolean("healthy_b6n1", false); }

    public void recordFirstRedirect(String entryUrl) {
        if (hasOpenedWebView()) return;
        preferences.edit().putBoolean("seen_k7v2", true)
                .putString("origin_d9m4", entryUrl).putBoolean("healthy_b6n1", false).commit();
    }

    public void recordWorkingPage(String url) {
        preferences.edit().putBoolean("seen_k7v2", true)
                .putString("document_f3s8", url).putBoolean("healthy_b6n1", true).apply();
    }

    public void markLastUrlBroken() { preferences.edit().putBoolean("healthy_b6n1", false).apply(); }

    public boolean wasTokenAccepted(String token) {
        return tokenHash(token).equals(preferences.getString("receipt_w5t9", ""));
    }

    public void recordAcceptedToken(String token) {
        preferences.edit().putString("receipt_w5t9", tokenHash(token)).commit();
    }

    private static String tokenHash(String token) {
        try {
            byte[] digest = java.security.MessageDigest.getInstance("SHA-256")
                    .digest(token.getBytes(java.nio.charset.StandardCharsets.UTF_8));
            StringBuilder result = new StringBuilder();
            for (byte value : digest) result.append(String.format(java.util.Locale.ROOT, "%02x", value & 255));
            return result.toString();
        } catch (java.security.NoSuchAlgorithmException exception) {
            throw new IllegalStateException(exception);
        }
    }
}
