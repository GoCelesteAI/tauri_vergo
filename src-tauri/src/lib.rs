use tauri_plugin_updater::UpdaterExt;

#[tauri::command]
async fn check_update(app: tauri::AppHandle) -> Result<String, String> {
  let updater = app.updater().map_err(|e| e.to_string())?;
  match updater.check().await.map_err(|e| e.to_string())? {
    Some(update) => {
      update
        .download_and_install(|_, _| {}, || {})
        .await
        .map_err(|e| e.to_string())?;
      app.restart();
    }
    None => Ok("up to date".into()),
  }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_updater::Builder::new().build())
    .invoke_handler(tauri::generate_handler![check_update])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
