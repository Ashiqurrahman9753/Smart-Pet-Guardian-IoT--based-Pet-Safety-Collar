import serial
import numpy as np
import cv2

ser = serial.Serial('COM25', 115200)  # Adjust the COM port as needed

# Create OpenCV window
cv2.namedWindow('ESP-EYE Video', cv2.WINDOW_NORMAL)

frame_buffer = b''  # Buffer to store binary frame data

while True:
    try:
        # Read data from the serial port
        data = ser.read(1024)
        frame_buffer += data  # Append the data to the buffer

        # Check for start and end markers in the buffer
        start_marker = frame_buffer.find(b'\xff\xd8')
        end_marker = frame_buffer.find(b'\xff\xd9')

        while start_marker != -1 and end_marker != -1:
            # Extract the frame data between start and end markers
            frame_data = frame_buffer[start_marker:end_marker + 2]
            frame_buffer = frame_buffer[end_marker + 2:]  # Remove processed data from the buffer

            try:
                # Decode the frame and display it using OpenCV
                frame = cv2.imdecode(np.frombuffer(frame_data, dtype=np.uint8), cv2.IMREAD_UNCHANGED)

                if frame is not None and frame.shape[1] > 0 and frame.shape[0] > 0:
                    cv2.imshow('ESP-EYE Video', frame)
                    cv2.waitKey(1)  # Adjust wait time for smoother display
                else:
                    print("Invalid frame format")

            except cv2.error as e:
                print(f"Error decoding frame: {e}")

            # Check for start and end markers in the remaining buffer
            start_marker = frame_buffer.find(b'\xff\xd8')
            end_marker = frame_buffer.find(b'\xff\xd9')

    except KeyboardInterrupt:
        ser.close()
        break

# Release OpenCV window
cv2.destroyAllWindows()