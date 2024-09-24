# Random Name Picker

Random Name Picker is a web application that allows users to manage lists of names and select a random name from these lists. It's designed to be a helpful tool for various scenarios like classroom activities, raffles, or any context where a random selection process is needed.

## Features

- Add, delete, and manage multiple lists of names.
- Mark names as "enabled" or "used".
- Select a random name from the enabled names.
- Reset the status of all names in a list.
- Export and import lists of names in JSON format.
- Offline functionality through service workers.
- Responsive design compatible with desktop and mobile devices.

## How to Use

### Online Version

If working, you can use the app directly through this link:
[Random Name Picker](https://random-name-picker.replit.app/)

### Local Setup

If you prefer to host the app yourself, follow these steps:

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/random-name-picker.git
    cd random-name-picker
    ```

2. **Serve the App**:
    - Use a simple HTTP server to serve the app. You can use Python’s built-in server for this:
      ```bash
      python3 -m http.server
      ```
    - Open your browser and navigate to `http://localhost:8000`.

### Using the App

1. **Add Names**:
    - Enter a name in the "Enter a name" field.
    - Click the "Add Name" button or press Enter to add the name to the current list.

2. **Select a Random Name**:
    - Click the "Select Random Name" button.
    - A random name from the enabled names will be selected and displayed.

3. **Manage Lists**:
    - **Create New List**: Enter a new list name in the "New list name" field and click "Create New List".
    - **Change Current List**: Select a list from the drop-down menu.
    - **Delete List**: Click the "Delete List" button to remove the current list.

4. **Export/Import Data**:
    - **Export**: Click the "Export Data" button to download the current lists as a JSON file.
    - **Import**: Click the "Import Data" button, select a JSON file to load lists from the file.

5. **Toggle View**:
    - Click the "Toggle View" button to switch between list view and grid view.

## Offline Usage

- The app uses a service worker to cache resources and provide offline functionality.
- Once you have visited the app online, it will continue to work offline with the last saved data.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Made by **Noah Hicks**.
