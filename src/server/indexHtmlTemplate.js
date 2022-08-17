export const indexHtmlTemplate = (content) => `
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Трекер задач с таймером по методу 'Pomodoro'.">
    <meta name="author" content="Калиниченко Виталий Викторович">
    <title>Помодоро</title>
    <script src="/static/client.js" type="application/javascript"></script>
    <script>
      window.__beforeDelete__ = undefined
    </script
  </head>
  <body>
    <div id="react_root">${content}</div>
    <div id="modal_root"></div>
  </body>
</html>
`;
