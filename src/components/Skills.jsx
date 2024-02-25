import { skillReducer, initialState } from '../reducers/skillReducer';
import { requestStates } from '../constants';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSkills } from '../customHooks/useSkills';


export const Skills = () => {

  const [sortedLanguageList, fetchRequestState] = useSkills();
  const convertCountToPercentage = (count) => {
    if (count > 10) { return 100; }
    return count * 10;
  };



  // const [languageList, setLanguageList] = useState([]);
  const [state, dispatch] = useReducer(skillReducer, initialState);


  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
          {
            fetchRequestState === requestStates.loading && (
              <p className="description">取得中...</p>
            )
          }
          {
            fetchRequestState === requestStates.success && (
              sortedLanguageList().map((item, index) => (
                <div key={index} className="skill-item">
                  <p className="description"><strong>{item.language}</strong></p>
                  <CircularProgressbar value={convertCountToPercentage(item.count)} text={`${convertCountToPercentage(item.count)}%`} />
                </div>
              ))
            )
          }
          {
            fetchRequestState === requestStates.error && (
              <p className="description">エラーが発生しました</p>
            )
          }
        </div>
      </div>
    </div>
  );
};


