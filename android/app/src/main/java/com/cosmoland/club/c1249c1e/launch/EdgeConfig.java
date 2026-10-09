package com.cosmoland.club.c1249c1e.launch;

import com.cosmoland.club.c1249c1e.BuildConfig;
import org.json.JSONObject;
import javax.net.ssl.HttpsURLConnection;
import java.net.URL;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.nio.charset.StandardCharsets;

/** No cached decision: country is determined by Cloudflare for the current connection. */
public final class EdgeConfig {
    public static final String PATH = "/config";
    public static final String ENABLED_FIELD = "enabled";
    public static final String URL_FIELD = "site_url";
    private EdgeConfig() {}

    public static String fetchEntryUrl() {
        String url = BuildConfig.EDGE_ORIGIN + PATH;
        if (!EntryProbe.isValidHttpsUrl(url)) return null;
        HttpsURLConnection connection = null;
        try {
            connection = (HttpsURLConnection) new URL(url).openConnection();
            connection.setInstanceFollowRedirects(false);
            connection.setConnectTimeout(8000);
            connection.setReadTimeout(8000);
            connection.setUseCaches(false);
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Cache-Control", "no-cache, no-store");
            if (connection.getResponseCode() != 200) return null;
            String contentType = connection.getContentType();
            if (contentType == null || !contentType.toLowerCase(java.util.Locale.ROOT).startsWith("application/json")) return null;
            try (InputStream input = connection.getInputStream(); ByteArrayOutputStream output = new ByteArrayOutputStream()) {
                byte[] buffer = new byte[1024];
                int count;
                while ((count = input.read(buffer)) != -1) {
                    if (output.size() + count > 8192) return null;
                    output.write(buffer, 0, count);
                }
                return parse(new JSONObject(output.toString(StandardCharsets.UTF_8.name())));
            }
        } catch (Exception error) {
            android.util.Log.i("CosmolotRoute", "Edge configuration unavailable: " + error.getClass().getSimpleName());
            return null;
        } finally { if (connection != null) connection.disconnect(); }
    }

    static String parse(JSONObject config) {
        Object enabled = config.opt(ENABLED_FIELD);
        Object url = config.opt(URL_FIELD);
        if (!Boolean.TRUE.equals(enabled) || !(url instanceof String)) return null;
        String entryUrl = ((String) url).trim();
        return EntryProbe.isValidHttpsUrl(entryUrl) ? entryUrl : null;
    }
}
