pub mod singbox_daemon {
    tonic::include_proto!("daemon");
}

use crate::compio_unix_stream_wrapper::UnixStream;
use kanal::AsyncReceiver;
use send_wrapper::SendWrapper;
// use singbox_daemon::daemon_client::DaemonClient;
use tonic::transport::Endpoint;
use tower::service_fn;

#[allow(dead_code)]
enum WebpageEvents {
    // configPath
    Start(String),
    Stop(),
    // selectorTag, outboundTag
    SelectOutbound(String, String),
    // clashMode
    SetClashMode(String),
    SetSystemProxyEnabled(bool),
    // outboundTag
    UrlTest(String),
}

#[allow(dead_code, unused_variables)]
async fn singbox_daemon_client_main(
    webpage_msg_reciever: AsyncReceiver<WebpageEvents>,
    tauri_app_handle: tauri::AppHandle,
) -> Result<(), Box<dyn std::error::Error>> {
    let socket_path = tauri::api::path::app_cache_dir(&(*tauri_app_handle.config()))
        .unwrap()
        .join("daemon.sock");
    let endpoint_with_compio =
        Endpoint::try_from("http://[::]:50551")?.executor(compio_http::CompioExecutor);
    let channel =
        endpoint_with_compio.connect_with_connector(service_fn(move |_: tonic::transport::Uri| {
            SendWrapper::new(UnixStream::connect(socket_path.clone()))
        }));

    Ok(())
}