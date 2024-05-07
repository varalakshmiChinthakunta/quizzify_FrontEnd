import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getQuizDataAction,
  getUserQuizDataAction,
  resetQuizDataAction,
  resetUserQuizDataAction,
} from "../../../redux/actions";
import { FaExternalLinkAlt } from "react-icons/fa";
import { API_CONSTANTS, APP_ROUTES, replaceInString } from "../../../utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import PageTitle from "../../PageTitle";
import ComponentLoader from "../../Loader/ComponentLoader";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const UserAnalyticsPerQuiz = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  //   ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);
  const quizData = useSelector((state) => state.analytics.userQuizData);

  console.log(quizData, "quizData");
  const quiz_id = params?.id;
  const user = params?.user;

  useEffect(() => {
    if (quiz_id && user) {
      dispatch(getUserQuizDataAction({ id: quiz_id, user }));
    }
  }, [params]);
  useEffect(() => {
    return () => {
      dispatch(resetUserQuizDataAction());
    };
  }, []);
  //   const quizData = [
  //     {
  //       question: "What is the capital of France?",
  //       correctAnswer: "Paris",
  //       userAnswer: 0,
  //       isCorrect: true,
  //     },
  //     {
  //       question: "What is the largest planet in our solar system?",
  //       correctAnswer: "Jupiter",
  //       userAnswer: 1,
  //       isCorrect: true,
  //     },
  //     {
  //       question: "Do you like this quiz?",
  //       correctAnswer: "Yes",
  //       userAnswer: 0,
  //       isCorrect: false,
  //     },
  //   ];

  const labels = quizData?.data?.map((data) => data.question);

  const barchartData = {
    labels,
    // datasets: Object.keys(resultPercentage),
    datasets: [
      {
        label: ["Total answers", "Total answers222"],
        data: quizData?.data?.map((data) => (data.isCorrect ? "10" : "-10")),
        backgroundColor: quizData?.data?.map((data) =>
          data.isCorrect ? "#198754" : "rgb(239, 68 ,68 )"
        ),

        // backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        // borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    scales: {
      y: {
        min: -10,
        max: 10,
        ticks: {
          display: false, // Hide the ticks
        },
        grid: {
          lineWidth: 1,
          //   drawTicks: false,
          color: (context) =>
            context.tick.value === 0 ? "rgba(0, 0, 0, 1)" : "rgba(0, 0, 0, 0)",
          drawOnChartArea: true,
        },
        // grid: {
        //   drawOnChartArea: true,
        //   //   display: true,
        //   //   drawBorder: false,
        //   color: ["rgba(0, 0, 0, 0)"],
        //   zeroLineColor: "rgba(0, 0, 0, 1)",
        //   borderWidth: 1,
        // },
      },
      x: {
        // ticks: {
        //   display: false, // Hide the ticks
        // },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      //   legend: {
      //     position: "top",
      //   },
      tooltip: {
        enabled: false, // <-- this option disables tooltips
      },
      title: {
        display: false, // Hide dataset label
      },
      legend: {
        display: false,
      },
      //   title: {
      //     display: true,
      //     text: "CBar Chart",
      //   },
    },
  };
  return quizData.status === API_CONSTANTS.loading ? (
    <ComponentLoader />
  ) : (
    <>
      <PageTitle text={` Analytics`} />
      <section>
        {/* <Bar data={barchartData} options={options} /> */}

        <table className="min-w-full ">
          <thead className="bg-navyblue h-[75px]    text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3  border-navyblue rounded-l-xl text-left text-3xl font-medium text-white capitalize tracking-wider "
              >
                Question
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-navyblue  text-left text-3xl font-medium text-white capitalize tracking-wider"
              >
                Submitted Answer
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-navyblue  text-left text-3xl font-medium text-white capitalize tracking-wider"
              >
                Correct Answer
              </th>
              <th
                scope="col"
                className="px-6 py-3  border-navyblue rounded-r-xl text-left text-3xl font-medium text-white capitalize tracking-wider "
              >
                Result
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {quizData?.data?.map((row, index) => (
              <tr
                key={row.id}
                className={` h-[75px] + ${index % 2 === 1 && "bg-[#f3f3f3]"}`}
              >
                <td className="px-6 py-4 w-[25%] text-ellipsis  font-medium  text-3xl  whitespace-nowrap text-start">
                  {row.question}
                </td>
                <td className="px-6 py-4 text-xl whitespace-nowrap text-start">
                  {row.userAnswer}
                </td>
                <td className="px-6 py-4 text-xl whitespace-nowrap text-start">
                  {row.correctAnswer}
                </td>
                <td className="px-6 py-4 text-xl whitespace-nowrap text-start">
                  {row.isCorrect ? "Correct ✅" : "Incorrect ❌"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default UserAnalyticsPerQuiz;
