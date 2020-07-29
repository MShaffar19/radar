import groupPoints from '../helpers/groupPoints'
import { colors } from '../styles.config'
import { useContext } from "react";
import SelectedPointContext from '../contexts/SelectedPointContext'

export default ({ points }) => {
  const groupedPoints = groupPoints(points)
  const { setSelectedPoint } = useContext(SelectedPointContext)

  return <div className="wrapper">
    <style jsx>{`
      .wrapper {
        overflow-x: auto;
      }
      
      table {
        border: 1px solid ${colors.darkPurple};
      }

      td, th {
        vertical-align: middle;
        border: 1px solid ${colors.darkPurple};
        padding: 5px 10px;
      }
      
      th.vote {
        text-align: center;
      }
      
      td.vote {
        text-align: center;
        color: white;
        text-transform: capitalize;
      }
      
      td.name {
        white-space: nowrap;
      }
      
      tr:nth-child(odd) td.name {
        background: white;
      }
      
      tr:nth-child(even) td.name {
        background: #f0f5f7;
      }
    `}
    </style>
    <table className="data">
      <thead>
        <tr>
          <th className="vote">Level</th>
          <th>Name</th>
          <th colSpan={1000} className="vote">Votes</th>
        </tr>
      </thead>

      <tbody>
        {
          ['adopt', 'trial', 'assess'].map(level => {
            return groupedPoints[level].map((point, i) => {
              return <tr key={`point-${level}-${point.key}`}>
                { i === 0 && <td rowSpan={groupedPoints[level].length} style={{background: colors[level]}} className="vote">
                  {level}
                </td> }
                <td className="name"><a onClick={_ => setSelectedPoint(point.landscapeId)}>{point.name}</a></td>
                {
                  ['adopt', 'trial', 'assess', 'hold'].map(voteKey => {
                    const votes = point.votes[voteKey]

                    return [...Array(votes || 0).keys()].map(i => {
                      const key = `vote-${level}-${point.key}-${voteKey}-${i}`
                      return <td key={key} style={{background: colors[voteKey]}} className="vote">
                        {voteKey}
                      </td>
                    })
                  })
                }
              </tr>
            })
          })
        }
      </tbody>
    </table>
  </div>
}