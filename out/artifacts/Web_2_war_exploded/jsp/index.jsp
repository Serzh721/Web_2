<%@ page import="model.Point" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Collections" %><%--
  Created by IntelliJ IDEA.
  User: Сережа
  Date: 22.10.2019
  Time: 17:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="history" type="beans.History" scope="application"/>
<html>
<head>
    <meta charset="UTF-8">
    <title>Web_2</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/styles/main.css">
</head>
<body background="${pageContext.request.contextPath}/ph/back_plant.png">

<div class="topside">
    <div> Кривошейкин Сергей Дмитриевич P3214</div>
    <div> Лабораторная работа №2</div>
    <div> Вариант 215706</div>
</div>

<div class="leftside">
    <form name="my_form" id="my_form" action="" method="post">

        <div class="otstup">
            <label class="podpis"> Изменение Х:
                <select name="X" form="my_form">
                    <option value="-4">-4</option>
                    <option value="-3">-3</option>
                    <option value="-2">-2</option>
                    <option value="-1">-1</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </label>
        </div>
        <p class="warn-checkbox" hidden>Не выбрано значение X</p>

        <div class="otstup">
            <label class="podpis"> Изменение У:
                <input type="text" name="Y" placeholder="от -3 до 5">
            </label>
        </div>
        <p class="warn-checkbox" hidden>Введено не число</p>
        <p class="warn-checkbox" hidden>Число выходит за пределы интервала </p>

        <div class="otstup">
            <label class="podpis"> Изменение R:
                <input type="text" name="R" id="R" placeholder="от 2 до 5">
            </label>
        </div>
        <p class="warn-checkbox" hidden>Введено не число</p>
        <p class="warn-checkbox" hidden>Число выходит за пределы интервала </p>

        <div class="otstup">
            <input id="check" name="check" class="submit-button" type="submit" title="Проверить">
            <input id="res" name="res" class="submit-button" type="reset">
        </div>

        <input type="hidden" name="offset">

        <div class="main">
            <%if (history.getList().size() > 0) {%>
            <h1>История запросов</h1>
            <button type="button" onclick="clearHistory(); location.reload()" class="history-button"
                    id="history-button">
                Очистить
            </button>
            <br>
            <table id="result-table">
                <tr id="table-headers">
                    <th>Координата X</th>
                    <th>Координата Y</th>
                    <th>Радиус</th>
                    <th>Попадание в область</th>
                    <th>Время запроса</th>
                </tr>
                <%
                    List<Point> list = new ArrayList<Point>(history.getList());
                    Collections.reverse(list);
                    for (Point p : list) {%>
                <tr>
                    <td><%=p.getX()%>
                    </td>
                    <td><%=p.getY()%>
                    </td>
                    <td><%=p.getR()%>
                    </td>
                    <td><%=p.isInArea()%>
                    </td>
                    <td><%=p.getTime()%>
                    </td>
                </tr>
                <%}%>
            </table>
            <%}%>
        </div>

    </form>

</div>
<div class="rightside" align="center">
    <canvas height="300px" width="300px"></canvas>
</div>

<script src="${pageContext.request.contextPath}/scripts/draw.js"></script>
<script src="${pageContext.request.contextPath}/scripts/main.js"></script>
<script src="${pageContext.request.contextPath}/scripts/ajax.js"></script>
</body>
</html>