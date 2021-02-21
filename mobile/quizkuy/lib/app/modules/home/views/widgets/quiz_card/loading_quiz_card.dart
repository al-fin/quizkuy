import 'package:dotted_line/dotted_line.dart';
import 'package:flutter/material.dart';
import 'package:shimmer/shimmer.dart';

class LoadingQuizCard extends StatelessWidget {
  const LoadingQuizCard({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(bottom: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(15),
        boxShadow: [
          BoxShadow(
            blurRadius: 6,
            offset: Offset(0, 6),
            color: Colors.black.withOpacity(0.15),
          )
        ],
      ),
      child: Shimmer.fromColors(
        baseColor: Colors.grey[300],
        highlightColor: Colors.grey[100],
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.all(10),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 40,
                    height: 40,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(40),
                    ),
                  ),
                  SizedBox(
                    width: 10,
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Container(width: 150, height: 20, color: Colors.white),
                      SizedBox(
                        height: 10,
                      ),
                      SizedBox(
                        width: 240,
                        child: DottedLine(
                          direction: Axis.horizontal,
                          lineLength: double.infinity,
                          lineThickness: 2.0,
                          dashLength: 6.0,
                          dashColor: Colors.grey[300],
                          dashRadius: 4.0,
                          dashGapLength: 6.0,
                          dashGapColor: Colors.transparent,
                          dashGapRadius: 0.0,
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Container(
                        width: 200,
                        height: 10,
                        color: Colors.white,
                        margin: EdgeInsets.only(bottom: 10),
                      ),
                      Container(
                        width: 200,
                        height: 10,
                        color: Colors.white,
                        margin: EdgeInsets.only(bottom: 10),
                      ),
                      Container(
                        width: 200,
                        height: 10,
                        color: Colors.white,
                        margin: EdgeInsets.only(bottom: 10),
                      ),
                      Container(
                        width: 200,
                        height: 10,
                        color: Colors.white,
                        margin: EdgeInsets.only(bottom: 15),
                      ),
                      Container(
                        width: 80,
                        height: 25,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(8),
                          color: Colors.grey[300],
                        ),
                        child: SizedBox(width: 100, height: 5),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
